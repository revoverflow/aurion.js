"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AurionClient: () => AurionClient,
  TimetableEntry: () => TimetableEntry
});
module.exports = __toCommonJS(src_exports);

// src/core/client.ts
var import_axios = __toESM(require("axios"));

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
    this.id = data.id;
    this.name = data.libelle;
    this.startDate = new Date(data.date_debut_evt);
    this.obtentionDate = new Date(data.date_obtention);
    this.professors = data.intervenants.split(", ");
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
    this.id = data.id;
    this.code = data.cours_code;
    this.name = data.cours_libelle;
    this.professors = data.intervenants.split(", ");
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
    return import_axios.default.create({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AurionClient,
  TimetableEntry
});
//# sourceMappingURL=index.js.map