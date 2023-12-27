import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ArrowDown } from "react-feather";

import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

import styles from "./Body.module.css";

import { saveAs } from "file-saver";
import { Packer } from "docx";
import { DocumentCreator } from "../../helpers/cv-generator";
import axios from "axios";

const Body = () => {
  const colors = ["#0A79DF"];

  const sections = {
    basicInfo: "Basic Info",
    education: "Education",
    project: "Projects",
    workExp: "Work Experience",
    achievement: "Achievements",
    summary: "Summary",
    other: "Other",
  };

  
  const resumeRef = useRef();

  const [activeColor, setActiveColor] = useState(colors[0]);

  const [resumeInformation, setResumeInformation] = useState();

  useEffect(() => {
    console.log("Inside useeffect on resumeInformation change");

    const resumeId = localStorage.getItem("resumeId");

    const fetchData = async () => {
      console.log(resumeId);
      if (resumeId) {
        try {
          const response = await axios
            .get(`http://localhost:5454/api/resume-data/${resumeId}`)
            .then((res) => {
              setResumeInformation(res.data?.data?.resume_data);
            });
        } catch (error) {
          console.error("Error fetching resume data:", error);
        }
      }
    };
    fetchData();
  }, []);

  const generate = () => {
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.createDocument(resumeInformation);

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "résumé.docx");
      console.log("Document created successfully");
    });
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Resume Builder</p>
      <div className={styles.toolbar}>
        {/* <div className={styles.colors}>
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
        </div> */}

        <button onClick={generate}>
          Download Docx <ArrowDown />
        </button>

        <ReactToPrint
          trigger={() => {
            return (
              <button>
                Download PDF <ArrowDown />
              </button>
            );
          }}
          content={() => resumeRef.current}
        />
      </div>
      {resumeInformation && (
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
