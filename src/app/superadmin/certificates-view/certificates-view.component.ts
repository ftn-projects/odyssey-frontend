import { Component } from '@angular/core';
import { SuperadminService } from '../superadmin.service';
import { Certificate } from '../model/certificate.mode';
import * as d3 from 'd3';
import { MatDialog } from '@angular/material/dialog';
import { CertificateCreationComponent } from '../certificate-creation/certificate-creation.component';
import { CertificateInfoComponent } from '../certificate-info/certificate-info.component';

@Component({
    selector: 'app-certificates-view',
    templateUrl: './certificates-view.component.html',
    styleUrl: './certificates-view.component.css'
})
export class CertificatesViewComponent {
    constructor(private service: SuperadminService, private dialog: MatDialog) { }
    certificates: Certificate[] = [];

    loadData() {
        this.service.getAllCertificates().subscribe({
            next: (data: Certificate[]) => {
                this.certificates = data;
                this.createTree();
            },
            error: (err) => console.log(err)
        });
    }

    ngOnInit() {
        this.loadData();
    }

    createTree() {
        d3.selectAll("svg").remove();

        let container = d3.select("#tree");
        let root = d3.stratify<any>()
            .id((d: unknown) => (d as Certificate).alias)
            .parentId((d: unknown) => (d as Certificate).parentAlias)
            (this.certificates);

        let treeLayout = d3.tree<any>()
            .size([600, 1000]) // Specify the size of the tree layout
            .separation((a, b) => (a.parent === b.parent ? 3 : 3));

        let treeData = treeLayout(root);
        let nodes = treeData.descendants(); // Extract nodes from the tree data
        let links = treeData.links(); // Extract links from the tree data

        const svgg = d3.create("svg")
            .attr("width", 600)
            .attr("height", 400)
            .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif; overflow: visible;");

        // Append links
        const link = svgg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#808080")
            .attr("stroke-width", 2)
            .selectAll()
            .data(links)
            .join("path")
            .attr("d", d => `
              M${d.source.y},${d.source.x}
              H${d.target.y}
              V${d.target.x}
            `);

        link.lower(); // Ensure links are drawn beneath other elements

        // Append nodes
        const node = svgg.append("g")
            .selectAll()
            .data(nodes)
            .join("g")
            .attr("transform", (d: any) => `translate(${d.y},${d.x - 15})`)
            .on("click", (event, d) => this.openDialog(d.data)); // Attach click event listener
        ; // Apply the x and y coordinates

        // Append white rectangle for the node
        const rect = node.append("rect")
            .attr("width", 120)
            .attr("height", 30)
            .attr("fill", "#fff")
            .attr("stroke", "#000")
            .attr("rx", 5)
            .attr("ry", 5);

        // Append text displaying commonName inside the rectangle
        const text = node.append("text")
            .attr("x", 10)
            .attr("y", 20)
            .text((d: any) => d.data.subject["CN"] ?? d.data.alias)
            .attr("font-family", "Montserrat");

        // Append the SVG to the container element
        container.append(() => svgg.node());
    }

    openDialog(certificate: any) {
        const dialogRef = this.dialog.open(CertificateInfoComponent, {
            data: { cert: certificate },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'YES') this.loadData();
        });
    }

}
