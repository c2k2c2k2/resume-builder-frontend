import {
  AlignmentType,
  Document,
  HeadingLevel,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} from "docx";

export class DocumentCreator {
  createDocument(jsonData) {
    const document = new Document({
      sections: [
        {
          children: [
            // Basic Info Section
            new Paragraph({
              text: jsonData['Basic Info'].detail.name,
              heading: HeadingLevel.TITLE,
            }),
            new Paragraph({
              text: jsonData['Basic Info'].detail.title,
              heading: HeadingLevel.HEADING_1,
            }),

            this.createContactInfo(
              jsonData['Basic Info'].detail.phone,
              jsonData['Basic Info'].detail.linkedin,
              jsonData['Basic Info'].detail.github,
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

  createContactInfo(phoneNumber, profileUrl, githubUrl, email) {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl}`,
          bold: true
        }),
        new TextRun({
          text: `GitHub: ${githubUrl} | Email: ${email}`,
          bold: true,
          break: 1
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
