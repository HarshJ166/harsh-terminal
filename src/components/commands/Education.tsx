import { EduIntro, EduList } from "../styles/Education.styled";
import { Wrapper } from "../styles/Output.styled";

const Education: React.FC = () => {
  return (
    <Wrapper data-testid="education">
      <EduIntro>Here is my education background!</EduIntro>
      {eduBg.map(({ title, desc }) => (
        <EduList key={title}>
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
        </EduList>
      ))}
    </Wrapper>
  );
};

const eduBg = [
  {
    title: "BTech in Information Technology",
    desc: "Shah and Anchor Kutcchhi Engineering College | 2021 ~ 2025",
  },
  {
    title: "Junior College",
    desc: "M.J. Junior College of Science | 2019 ~ 2021",
  },
  {
    title: "School",
    desc: "Swami Vivekanand International School & Jr. College | 2018 ~ 2019",
  }
];

export default Education;
