import {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TabStopPosition,
    TabStopType,
    TextRun,
  } from "docx";
  
  const PHONE_NUMBER = "07534563401";
  const PROFILE_URL = "https://www.linkedin.com/in/dolan1";
  const EMAIL = "docx@docx.com";

  // Your JSON Data
const jsonData = {
    
        "Basic Info": {
            "id": "Basic Info",
            "sectionTitle": "Basic Info",
            "detail": {
                "name": "Chaitanya",
                "title": "Kanzarkar",
                "linkedin": "https://github.com/",
                "github": "https://github.com/",
                "email": "c2k2c2k2@gmail.com",
                "phone": "9405456530"
            }
        },
        "Work Experience": {
            "id": "Work Experience",
            "sectionTitle": "Work Experience",
            "details": [
                {
                    "certificationLink": "https://github.com/",
                    "title": "Backend Developer",
                    "startDate": "2023-12-20",
                    "endDate": "2023-12-26",
                    "companyName": "CXR Agency",
                    "location": "Amravati",
                    "points": [
                        "Nodejs",
                        "Adonisjs",
                        "Nextjs"
                    ]
                }
            ]
        },
        "Projects": {
            "id": "Projects",
            "sectionTitle": "Projects",
            "details": [
                {
                    "link": "https://github.com/",
                    "title": "Module Creator",
                    "overview": "Dynamic Forms Building",
                    "github": "https://github.com/",
                    "points": [
                        "Reactjs Frontend",
                        "Nodejs Backend",
                        "MongoDb client",
                        "Fullstack development"
                    ]
                }
            ]
        },
        "Education": {
            "id": "Education",
            "sectionTitle": "Education",
            "details": [
                {
                    "title": "MCA",
                    "college": "Sant Gadge Baba Amravati University",
                    "startDate": "2023-12-14",
                    "endDate": "2023-12-19"
                },
                {
                    "title": "BSc",
                    "college": "VMV College, Amravati",
                    "startDate": "2023-12-07",
                    "endDate": "2023-12-11"
                }
            ]
        },
        "Achievements": {
            "id": "Achievements",
            "sectionTitle": "Achievements",
            "points": [
                "Magician",
                "Tabla Player",
                "National Level Judo Championship",
                "Rotary Youth Exchange 2012-13 France"
            ]
        },
        "Summary": {
            "id": "Summary",
            "sectionTitle": "Summary",
            "detail": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        "Other": {
            "id": "Other",
            "sectionTitle": "Other",
            "detail": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    
  };
  
  export class DocumentCreator {
    create(experiences, educations, skills, achievements) {
      const document = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: "Dolan Miu",
                heading: HeadingLevel.TITLE,
              }),
              this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
              this.createHeading("Education"),
              ...educations
                .map((education) => {
                  const arr = [];
                  arr.push(
                    this.createInstitutionHeader(
                      education.schoolName,
                      `${education.startDate.year} - ${education.endDate.year}`
                    )
                  );
                  arr.push(this.createRoleText(`${education.fieldOfStudy} - ${education.degree}`));
  
                  const bulletPoints = this.splitParagraphIntoBullets(education.notes);
                  bulletPoints.forEach((bulletPoint) => {
                    arr.push(this.createBullet(bulletPoint));
                  });
  
                  return arr;
                })
                .reduce((prev, curr) => prev.concat(curr), []),
              this.createHeading("Experience"),
              ...experiences
                .map((position) => {
                  const arr = [];
  
                  arr.push(
                    this.createInstitutionHeader(
                      position.company.name,
                      this.createPositionDateText(position.startDate, position.endDate, position.isCurrent)
                    )
                  );
                  arr.push(this.createRoleText(position.title));
  
                  const bulletPoints = this.splitParagraphIntoBullets(position.summary);
                  bulletPoints.forEach((bulletPoint) => {
                    arr.push(this.createBullet(bulletPoint));
                  });
  
                  return arr;
                })
                .reduce((prev, curr) => prev.concat(curr), []),
              this.createHeading("Skills, Achievements and Interests"),
              this.createSubHeading("Skills"),
              this.createSkillList(skills),
              this.createSubHeading("Achievements"),
              ...this.createAchievementsList(achievements),
              this.createSubHeading("Interests"),
              this.createInterests(
                "Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing."
              ),
              this.createHeading("References"),
              new Paragraph(
                "Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk"
              ),
              new Paragraph("More references upon request"),
              new Paragraph({
                text:
                  "This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.",
                alignment: AlignmentType.CENTER,
              }),
            ],
          },
        ],
      });
  
      return document;
    }

    createDocument() {
        const document = new Document({
          sections: [
            {
              children: [
                // Basic Info Section
                new Paragraph({
                  text: jsonData['Basic Info'].detail.name + " " + jsonData['Basic Info'].detail.title,
                  heading: HeadingLevel.TITLE,
                }),
                this.createContactInfo(
                  jsonData['Basic Info'].detail.phone,
                  jsonData['Basic Info'].detail.linkedin,
                  jsonData['Basic Info'].detail.email
                ),
                
                // Work Experience Section
                this.createHeading(jsonData['Work Experience'].sectionTitle),
                ...jsonData['Work Experience'].details.map((job) => [
                  this.createInstitutionHeader(job.companyName, `${job.startDate} - ${job.endDate}`),
                  this.createRoleText(job.title),
                  ...job.points.map(point => this.createBullet(point))
                ]).flat(),
                
                // Projects Section
                this.createHeading(jsonData['Projects'].sectionTitle),
                ...jsonData['Projects'].details.map((project) => [
                  this.createInstitutionHeader(project.title, project.link),
                  ...project.points.map(point => this.createBullet(point))
                ]).flat(),
    
                // Education Section
                this.createHeading(jsonData['Education'].sectionTitle),
                ...jsonData['Education'].details.map((edu) => [
                  this.createInstitutionHeader(edu.college, `${edu.startDate} - ${edu.endDate}`),
                  this.createRoleText(edu.title)
                ]).flat(),
    
                // Achievements Section
                this.createHeading(jsonData['Achievements'].sectionTitle),
                ...jsonData['Achievements'].points.map(point => this.createBullet(point)),
    
                // Summary Section
                this.createHeading(jsonData['Summary'].sectionTitle),
                new Paragraph(jsonData['Summary'].detail),
    
                // Other Section
                this.createHeading(jsonData['Other'].sectionTitle),
                new Paragraph(jsonData['Other'].detail),
              ],
            },
          ],
        });
    
        return document;
    }
    
    createContactInfo(phoneNumber, profileUrl, email) {
      return new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`),
          new TextRun({
            text: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
            break: 1,
          }),
        ],
      });
    }
  
    createHeading(text) {
      return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_1,
        thematicBreak: true,
      });
    }
  
    createSubHeading(text) {
      return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_2,
      });
    }
  
    createInstitutionHeader(institutionName, dateText) {
      return new Paragraph({
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX,
          },
        ],
        children: [
          new TextRun({
            text: institutionName,
            bold: true,
          }),
          new TextRun({
            text: `\t${dateText}`,
            bold: true,
          }),
        ],
      });
    }
  
    createRoleText(roleText) {
      return new Paragraph({
        children: [
          new TextRun({
            text: roleText,
            italics: true,
          }),
        ],
      });
    }
  
    createBullet(text) {
      return new Paragraph({
        text: text,
        bullet: {
          level: 0,
        },
      });
    }
  
    createSkillList(skills) {
      return new Paragraph({
        children: [new TextRun(skills.map((skill) => skill.name).join(", ") + ".")],
      });
    }
  
    createAchievementsList(achievements) {
      return achievements.map(
        (achievement) =>
          new Paragraph({
            text: achievement.name,
            bullet: {
              level: 0,
            },
          })
      );
    }
  
    createInterests(interests) {
      return new Paragraph({
        children: [new TextRun(interests)],
      });
    }
  
    splitParagraphIntoBullets(text) {
      return text.split("\n\n");
    }
  
    createPositionDateText(startDate, endDate, isCurrent) {
      const startDateText = this.getMonthFromInt(startDate.month) + ". " + startDate.year;
      const endDateText = isCurrent ? "Present" : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;
  
      return `${startDateText} - ${endDateText}`;
    }
  
    getMonthFromInt(value) {
      switch (value) {
        case 1:
          return "Jan";
        case 2:
          return "Feb";
        case 3:
          return "Mar";
        case 4:
          return "Apr";
        case 5:
          return "May";
        case 6:
          return "Jun";
        case 7:
          return "Jul";
        case 8:
          return "Aug";
        case 9:
          return "Sept";
        case 10:
          return "Oct";
        case 11:
          return "Nov";
        case 12:
          return "Dec";
        default:
          return "N/A";
      }
    }
  }
  