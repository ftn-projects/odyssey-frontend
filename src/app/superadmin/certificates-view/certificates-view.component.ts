import { Component } from '@angular/core';
import { SuperadminService } from '../superadmin.service';
import { Certificate } from '../model/certificate.mode';
import * as d3 from 'd3';

@Component({
  selector: 'app-certificates-view',
  templateUrl: './certificates-view.component.html',
  styleUrl: './certificates-view.component.css'
})
export class CertificatesViewComponent {
    constructor(private service: SuperadminService){}
    certificates: Certificate[] = [];

    

    loadData(){
        this.service.getAllCertificates().subscribe({
                next: (data: Certificate[]) => {
                    this.certificates = data;
                },
                error: (err) => console.log(err)
            });
    }

    ngOnInit(){
        this.loadData();
        this.loadDummyData();
        this.createTree();
    }

    rootCertificate: Certificate = {
        commonName: "Root",
        email: this.generateRandomEmail(),
        uid: "root",
        startDate: new Date(),
        endDate: new Date(),
    };

    generateRandomEmail(): string {
        const randomString = Math.random().toString(36).substring(7);
        return `user${randomString}@example.com`;
    }
    
    randomDate(start: Date, end: Date): Date {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    dummyCertificates: Certificate[] = [this.rootCertificate];

    loadDummyData(){
        for (let i = 1; i <= 29; i++) {
            const parentIndex = Math.floor(Math.random() * i); // Choose a random parent index
            const parentCertificate = this.dummyCertificates[parentIndex];
        
            const newCertificate: Certificate = {
                parentAlias: parentCertificate.uid,
                commonName: `Child ${i}`,
                email: this.generateRandomEmail(),
                uid: `child-${i}`,
                startDate: this.randomDate(new Date(), new Date(2025, 11, 31)), // Random start date
                endDate: this.randomDate(new Date(2026, 0, 1), new Date(2030, 11, 31)), // Random end date after start date
            };
        
            this.dummyCertificates.push(newCertificate);
        }
    }

    createTree() {
        let container = d3.select("#tree");
        let root = d3.stratify<Certificate>()
            .id((d: unknown) => (d as Certificate).uid)
            .parentId((d: unknown) => (d as Certificate).parentAlias)
            (this.dummyCertificates);
    
        let treeLayout = d3.tree<Certificate>()
            .size([600, 1000]); // Specify the size of the tree layout
    
        let treeData = treeLayout(root); // Generate the tree layout data
    
        let nodes = treeData.descendants(); // Extract nodes from the tree data
        let links = treeData.links(); // Extract links from the tree data
    
        const svgg = d3.create("svg")
            .attr("width", 600)
            .attr("height", 400)
            .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif; overflow: visible;");
    
        // Adjust the x-coordinate of the nodes to start from left to right
        const node = svgg.append("g")
            .selectAll()
            .data(nodes)
            .join("g")
            .attr("transform", (d: any) => `translate(${d.y},${d.x})`); // Apply the x and y coordinates
    
        node.append("circle")
            .attr("r", 2.5)
            .attr("fill", d => d.children ? null : "#999");
    
        node.append("text")
            .attr("dy", "0.32em")
            .attr("x", 6)
            .text((d: any) => d.data.commonName);
    
        node.append("title")
            .text(d => d.ancestors().reverse().map(d => (d.data as Certificate).commonName).join("/"));
    
        const link = svgg.append("g")
            .attr("fill", "none")
            .attr("stroke", "red")
            .selectAll()
            .data(links)
            .join("path")
            .attr("d", d => `
              M${d.source.y},${d.source.x}
              H${d.target.y}
              V${d.target.x}
            `);
    
        // Append the SVG to the container element
        container.append(() => svgg.node());
    }
    

}
