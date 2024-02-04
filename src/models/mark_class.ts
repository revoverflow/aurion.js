import Mark from "./mark";

export default class MarkClass {
    
    public id: number;
    public code: string;
    public name: string;
    public professors: string[];
    public average: number;
    public credits: {
        obtained: number,
        total: number
    };
    public validated: boolean;
    public marks: Mark[] = [];


    constructor(data: any) {
        this.id = data.id;
        this.code = data.cours_code;
        this.name = data.cours_libelle;
        this.professors = data.intervenants.split(', ');
        this.average = parseFloat(data.inscription_cours.moyenne);
        this.credits = {
            obtained: parseInt(data.inscription_cours.nombre_credits_obtenus),
            total: parseInt(data.inscription_cours.nombre_credits_potentiels)
        }
        this.validated = data.inscription_cours.validated;

        this.marks = data.epreuves.map((mark: any) => new Mark(mark));
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            name: this.name,
            professors: this.professors,
            average: this.average,
            credits: this.credits,
            validated: this.validated,
            marks: this.marks.map(mark => mark.toJSON())
        }
    }

}