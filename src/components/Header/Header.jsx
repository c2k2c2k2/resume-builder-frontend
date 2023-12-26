import React from "react";
import styles from "./Header.module.css";
import resumeSvg from "../../assets/resume.svg";
import { useNavigate } from "react-router-dom";
import updateDB from "../../helpers/helpers";
import { ChevronsRight } from "react-feather";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.heading}>
            A <span>Résumé</span> that stands out!
          </p>
          <p className={styles.heading}>Make your own resume.</p>
        </div>
        <div className={styles.right}>
          <img src={resumeSvg} alt="Resume" />
        </div>
        <div>
          <button
            onClick={async() => {
              await updateDB(null);
              navigate("/resume-builder");
            }}
            className={styles.btn}
          >
            Build Your Resume <ChevronsRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
