import {
  AboutWrapper,
  HighlightAlt,
  HighlightSpan,
} from "../styles/About.styled";

const About: React.FC = () => {
  return (
    <AboutWrapper data-testid="about">
      <p>
        Hi, my name is <HighlightSpan>Harsh Jajal</HighlightSpan>!
      </p>
      <div>
          A final-year student at <HighlightAlt>SAKEC</HighlightAlt> with experience in software development, specializing in <HighlightAlt>MERN Stack</HighlightAlt>, <HighlightAlt>Next.js</HighlightAlt>, <HighlightAlt>Django</HighlightAlt>, and more. I’ve completed internships at <HighlightAlt>Intel</HighlightAlt>, <HighlightAlt>Bot2do Technologies</HighlightAlt>, and currently work as a <HighlightAlt>Django Developer</HighlightAlt> at <HighlightAlt>CypherSol Fintech India Pvt Ltd</HighlightAlt>. 
        </div>
        <div>
          With a passion for technology and leadership, I’ve held various positions, including Event Coordinator, Sports Club Head, and Student Council Member. I'm continually working to improve my skills and explore new challenges in both development and cybersecurity.
        </div>
    </AboutWrapper>
  );
};

export default About;
