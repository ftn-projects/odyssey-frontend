export interface Certificate{
    parentAlias?: string,
    commonName?: string,
    email?: string,
    uid?: string,
    startDate?: Date,
    endDate?: Date,
    extensions?: Map<Extension, string[]>
}

export enum Extension {
    BASIC_CONSTRAINTS,
    KEY_USAGE,
    SUBJECT_KEY_IDENTIFIER,
    AUTHORITY_KEY_IDENTIFIER
}

//create mapper that maps string value to enum
export const ExtensionMapper = {
    'Basic Constraints': Extension.BASIC_CONSTRAINTS,
    'Key Usage': Extension.KEY_USAGE,
    'Subject Key Identifier': Extension.SUBJECT_KEY_IDENTIFIER,
    'Authority Key Identifier': Extension.AUTHORITY_KEY_IDENTIFIER
}

