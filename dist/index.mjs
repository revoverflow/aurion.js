var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/core/client.ts
import axios from "axios";

// src/models/timetable_entry.ts
var TimetableEntry = class {
  constructor(data) {
    this.title = "Sans titre";
    this.description = "Pas de description";
    this.originalData = data;
    this.id = data.id;
    this.startDate = new Date(data.date_debut);
    this.endDate = new Date(data.date_fin);
    this.class = data.matiere;
    this.activityType = data.type_activite;
    this.teachers = data.intervenants;
    this.room = data.ressource;
    this.title = data.favori.f3;
    this.description = Object.keys(data.favori).filter((key) => key !== "f1").map((key) => data.favori[key]).join("\n");
  }
  toJSON() {
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
    };
  }
};

// src/models/mark.ts
var Mark = class {
  constructor(data) {
    var _a;
    this.id = data.id;
    this.name = data.libelle;
    this.startDate = new Date(data.date_debut_evt);
    this.obtentionDate = new Date(data.date_obtention);
    this.professors = ((_a = data.intervenants) == null ? void 0 : _a.split(", ")) || [];
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
    };
  }
};

// src/models/mark_class.ts
var MarkClass = class {
  constructor(data) {
    this.marks = [];
    var _a;
    this.id = data.id;
    this.code = data.cours_code;
    this.name = data.cours_libelle;
    this.professors = ((_a = data.intervenants) == null ? void 0 : _a.split(", ")) || [];
    this.average = parseFloat(data.inscription_cours.moyenne);
    this.credits = {
      obtained: parseInt(data.inscription_cours.nombre_credits_obtenus),
      total: parseInt(data.inscription_cours.nombre_credits_potentiels)
    };
    this.validated = data.inscription_cours.validated;
    this.marks = data.epreuves.map((mark) => new Mark(mark));
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
      marks: this.marks.map((mark) => mark.toJSON())
    };
  }
};

// src/core/client.ts
var AurionClient = class {
  constructor(config) {
    this.config = config;
    this.tokens = config.tokens;
    this.client = this.getClient();
  }
  get loggedIn() {
    var _a;
    return !!((_a = this.tokens) == null ? void 0 : _a.normal);
  }
  getClient() {
    var _a;
    return axios.create({
      baseURL: this.config.baseUrl,
      headers: { "Authorization": this.loggedIn ? `Bearer ${(_a = this.tokens) == null ? void 0 : _a.normal}` : "" }
    });
  }
  login(login, password) {
    return __async(this, null, function* () {
      const response = yield this.client.post("/login", { login, password });
      this.tokens = response.data;
      this.client = this.getClient();
      return;
    });
  }
  getTimetable(startDate, endDate) {
    return __async(this, null, function* () {
      const date_debut = startDate.toISOString().split("T")[0];
      const date_fin = endDate.toISOString().split("T")[0];
      const response = yield this.client.get("/mon_planning", { params: { date_debut, date_fin } });
      const entries = response.data.filter((entry) => entry.id).map((entry) => new TimetableEntry(entry));
      return entries;
    });
  }
  getMarks() {
    return __async(this, null, function* () {
      const response = yield this.client.get("/mes_notes");
      const result = response.data.map((mark) => new MarkClass(mark));
      return result;
    });
  }
  getAbsences() {
    return __async(this, null, function* () {
      const response = yield this.client.get("/mes_absences");
      const result = response.data;
      return result;
    });
  }
};
export {
  AurionClient,
  TimetableEntry
};
//# sourceMappingURL=index.mjs.map