import axios from "axios";

const colors = ["#0A79DF"];

const sections = {
  basicInfo: "Basic Info",
  workExp: "Work Experience",
  project: "Projects",
  education: "Education",
  achievement: "Achievements",
  summary: "Summary",
  other: "Other",
};

const initialInformation = {
  [sections.basicInfo]: {
    id: sections.basicInfo,
    sectionTitle: sections.basicInfo,
    detail: {},
  },
  [sections.workExp]: {
    id: sections.workExp,
    sectionTitle: sections.workExp,
    details: [],
  },
  [sections.project]: {
    id: sections.project,
    sectionTitle: sections.project,
    details: [],
  },
  [sections.education]: {
    id: sections.education,
    sectionTitle: sections.education,
    details: [],
  },
  [sections.achievement]: {
    id: sections.achievement,
    sectionTitle: sections.achievement,
    points: [],
  },
  [sections.summary]: {
    id: sections.summary,
    sectionTitle: sections.summary,
    detail: "",
  },
  [sections.other]: {
    id: sections.other,
    sectionTitle: sections.other,
    detail: "",
  },
};

export default async function updateDB(data) {
  const resumeId = localStorage.getItem("resumeId");
  if (resumeId) {
    if (data) {
      await axios
        .put(`http://localhost:5454/api/resume-data/${resumeId}`, {
          resume_data: data,
        })
        .then(
          (response) => {
            let result = response.data;
            console.log("axios => ", result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  } else {
    await axios
      .post(`http://localhost:5454/api/resume-data`, {
        resume_data: initialInformation,
      })
      .then(
        (response) => {
          let result = response.data;
          localStorage.setItem("resumeId", result.data._id)
          console.log("axios => ", result.data._id);
        },
        (error) => {
          console.log(error);
        }
      );
  }
};
