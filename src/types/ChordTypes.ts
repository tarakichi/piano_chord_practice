import { type NoteName } from './noteNames';

type ChordTypeID = 
    | "maj"    //""
    | "min"    //"m"
    | "dim"    //"dim", "mb5"
    | "aug"
    | "7"
    | "M7"
    | "m7"
    | "mM7"
    | "sus2"
    | "sus4"
    | "dim7"
    | "m7b5"
    | "6"
    | "m6"
    | "add9"
    | "madd9"

interface ChordTypeDefinition {
    id: ChordTypeID;
    label: string;
    aliases: string[];
    intervals: number[];
}

export const chordTypes: ChordTypeDefinition[] = [
    {
        id: "maj",
        label: "",
        aliases: [""],
        intervals: [0, 4, 7],
    },
    {
        id: "min",
        label: "m",
        aliases: ["m"],
        intervals: [0, 3, 7],
    },
    {
        id: "dim",
        label: "dim",
        aliases: ["dim", "mb5"],
        intervals: [0, 3, 6],
    },
    {
        id: "aug",
        label: "aug",
        aliases: ["aug"],
        intervals: [0, 4, 8],
    },
    {
        id: "7",
        label: "7",
        aliases: ["7"],
        intervals: [0, 4, 7, 10],
    },
    {
        id: "M7",
        label: "M7",
        aliases: ["M7"],
        intervals: [0, 4, 7, 11],
    },
    {
        id: "m7",
        label: "m7",
        aliases: ["m7"],
        intervals: [0, 3, 7, 10],
    },
    {
        id: "mM7",
        label: "mM7",
        aliases: ["mM7"],
        intervals: [0, 3, 7, 11],
    },
    {
        id: "sus2",
        label: "sus2",
        aliases: ["sus2"],
        intervals: [0, 2, 7],
    },
    {
        id: "sus4",
        label: "sus4",
        aliases: ["sus4"],
        intervals: [0, 5, 7],
    },
    {
        id: "dim7",
        label: "dim7",
        aliases: ["dim7"],
        intervals: [0, 3, 6, 9],
    },
    {
        id: "m7b5",
        label: "m7b5",
        aliases: ["m7b5"],
        intervals: [0, 3, 6, 10],
    },
    {
        id: "6",
        label: "6",
        aliases: ["6"],
        intervals: [0, 4, 7, 9],
    },
    {
        id: "m6",
        label: "m6",
        aliases: ["m6"],
        intervals: [0, 3, 7, 9],
    },
    {
        id: "add9",
        label: "add9",
        aliases: ["add9"],
        intervals: [0, 4, 7, 2],
    },
    {
        id: "madd9",
        label: "madd9",
        aliases: ["madd9"],
        intervals: [0, 3, 7, 2],
    },
];

const aliasMap: Record<string, ChordTypeDefinition> = {};
for (const type of chordTypes) {
    for (const alias of type.aliases) {
        aliasMap[alias] = type;
    }
}

export interface ChordData {
    root: NoteName;
    type: ChordTypeID;
    fullName: string;
    score: number;
}