export default class Mark {

    public id: string;
    public name: string;
    public startDate: Date;
    public obtentionDate: Date;
    public professors: string[];

    public value?: number;
    public appreciation?: string;

    public absence?: boolean;
    public notRated?: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.libelle;
        this.startDate = new Date(data.date_debut_evt);
        this.obtentionDate = new Date(data.date_obtention);
        this.professors = data.intervenants?.split(', ') || [];
        this.value = parseFloat(data.note);
        this.appreciation = data.appreciation;
        this.absence = data.est_absent;
        this.notRated = data.est_non_noter;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            startDate: this.startDate,
            obtentionDate: this.obtentionDate,
            professors: this.professors,
            value: this.value,
            absence: this.absence,
            notRated: this.notRated
        }
    }

}