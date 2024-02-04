export default class TimetableEntry {

    public id?: number;

    public startDate: Date;
    public endDate: Date;

    public class: string;
    public activityType: string;
    public teachers?: string;
    public room?: string;

    public title: string = "Sans titre";
    public description: string = "Pas de description";

    private originalData: any;

    constructor(data: any) {
        this.originalData = data;

        this.id = data.id;
        this.startDate = new Date(data.date_debut);
        this.endDate = new Date(data.date_fin);

        this.class = data.matiere;
        this.activityType = data.type_activite;
        this.teachers = data.intervenants;
        this.room = data.ressource;

        this.title = data.favori.f3;
        this.description = Object.keys(data.favori).filter(key => key !== 'f1').map(key => data.favori[key]).join('\n');        
    }

    public toJSON() {
        return {
            id: this.id,
            startDate: this.startDate,
            endDate: this.endDate,
            class: this.class,
            activityType: this.activityType,
            teachers: this.teachers,
            room: this.room,
            title: this.title,
            description: this.description
        }
    }

}