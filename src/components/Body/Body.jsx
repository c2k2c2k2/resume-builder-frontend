import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ArrowDown } from "react-feather";

import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

import styles from "./Body.module.css";

import { saveAs } from "file-saver";
import { Packer } from "docx";
import {
  experiences,
  education,
  skills,
  achievements,
} from "../../helpers/cv-data";
import { DocumentCreator } from "../../helpers/cv-generator";
import axios from "axios";

const Body = () => {
  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];

  const [loading, setLoading] = useState(true);
  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    achievement: "Achievements",
    summary: "Summary",
    other: "Other",
  };
  const intialResumeInformation = {
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
  const resumeRef = useRef();

  const [activeColor, setActiveColor] = useState(colors[0]);
  const [resumeInformation, setResumeInformation] = useState(null);

  useEffect(() => {
    console.log("Inside useeffect on resumeInformation change");

    if (!localStorage.getItem("resumeId")) {
      async function createResume() {
        axios
          .post("http://localhost:5454/api/resume-data", {
            resume_data: intialResumeInformation,
          })
          .then(
            (response) => {
              let result = response.data;
              console.log("axios => ", result);

              localStorage.setItem("resumeId", result?.data?._id);
              setResumeInformation(intialResumeInformation);
            },
            (error) => {
              console.log(error);
            }
          );
      }

      createResume();
      setLoading(true);
    } else {
      async function fetchResumeData() {
        const resumeId = localStorage.getItem("resumeId");
        axios.get(`http://localhost:5454/api/resume-data/${resumeId}`).then(
          (response) => {
            let result = response.data;
            console.log("axios => ", result);

            console.log("resume data : ", result.data.resume_data);

            setResumeInformation(result?.data?.resume_data);
          },
          (error) => {
            console.log(error);
          }
        );
      }

      fetchResumeData();
      setLoading(true);
    }
  }, []);

  const generate = () => {
    console.log(experiences, education, skills, achievements);
    const documentCreator = new DocumentCreator();
    // const doc = documentCreator.create(
    //   experiences,
    //   education,
    //   skills,
    //   achievements
    // );
    const doc = documentCreator.createDocument(resumeInformation);

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Resume Builder</p>
      <div className={styles.toolbar}>
        <div className={styles.colors}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${styles.color} ${
                activeColor === item ? styles.active : ""
              }`}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>

        <button onClick={generate}>
          Download Docx <ArrowDown />
        </button>

        <ReactToPrint
          trigger={() => {
            return (
              <button>
                Download <ArrowDown />
              </button>
            );
          }}
          content={() => resumeRef.current}
        />
      </div>
      {loading && resumeInformation && (
        <div className={styles.main}>
          <Editor
            sections={sections}
            information={resumeInformation}
            setInformation={setResumeInformation}
          />
          <Resume
            ref={resumeRef}
            sections={sections}
            information={resumeInformation}
            activeColor={activeColor}
          />
        </div>
      )}
    </div>
  );
};

export default Body;
