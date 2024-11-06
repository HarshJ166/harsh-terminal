import {
  Cmd,
  HeroContainer,
  PreName,
  PreNameMobile,
  PreWrapper,
  Seperator,
} from "../styles/Welcome.styled";

const Welcome: React.FC = () => {
  return (
    <HeroContainer data-testid="welcome">
      <div className="info-section">
        <PreName>
          {`
$$\\   $$\\                               $$\\                $$$$$\\                         $$\\ 
$$ |  $$ |                              $$ |               \\__$$ |                        $$ |
$$ |  $$ | $$$$$$\\   $$$$$$\\   $$$$$$$\\ $$$$$$$\\              $$ | $$$$$$\\  $$\\  $$$$$$\\  $$ |
$$$$$$$$ | \\____$$\\ $$  __$$\\ $$  _____|$$  __$$\\             $$ | \\____$$\\ \\__| \\____$$\\ $$ |
$$  __$$ | $$$$$$$ |$$ |  \\__|\\$$$$$$\\  $$ |  $$ |      $$\\   $$ | $$$$$$$ |$$\\  $$$$$$$ |$$ |
$$ |  $$ |$$  __$$ |$$ |       \\____$$\\ $$ |  $$ |      $$ |  $$ |$$  __$$ |$$ |$$  __$$ |$$ |
$$ |  $$ |\\$$$$$$$ |$$ |      $$$$$$$  |$$ |  $$ |      \\$$$$$$  |\\$$$$$$$ |$$ |\\$$$$$$$ |$$ |
\\__|  \\__| \\_______|\\__|      \\_______/ \\__|  \\__|       \\______/  \\_______|$$ | \\_______|\\__|
                                                                      $$\\   $$ |              
                                                                      \\$$$$$$  |              
                                                                       \\______/               
          `}
        </PreName>
        <PreWrapper>
          <PreNameMobile>
            {`
$$\\   $$\\                               $$\\           
$$ |  $$ |                              $$ |          
$$ |  $$ | $$$$$$\\   $$$$$$\\   $$$$$$$\\ $$$$$$$\\     
$$$$$$$$ | \\____$$\\ $$  __$$\\ $$  _____|$$  __$$\\    
$$  __$$ | $$$$$$$ |$$ |  \\__|\\$$$$$$\\  $$ |  $$ |   
$$ |  $$ |$$  __$$ |$$ |       \\____$$\\ $$ |  $$ |   
$$ |  $$ |\\$$$$$$$ |$$ |      $$$$$$$  |$$ |  $$ |   
\\__|  \\__| \\_______|\\__|      \\_______/ \\__|  \\__|   
                                                   
          `}
          </PreNameMobile>
        </PreWrapper>
        
        <div>Welcome to my terminal portfolio. (Version 1.3.1)</div>
        <Seperator>----</Seperator>
        <div>
          Hey there! I’m Harsh Dinesh Jajal, a final-year student at SAKEC and a software developer who lives by the code and writes it too.
        </div>
        <Seperator>----</Seperator>
        <div >
          I don’t just write code—I craft solutions, lead projects, and keep pushing my limits. From handling events to diving deep into tech, I’m all about mixing creativity with a dose of code logic. Every project, every bug, every late night—it’s all part of the journey. Because in tech (and life), if you’re not growing, you’re stalling. Let’s keep building, keep learning, and keep pushing the envelope.
        </div>
        <Seperator>----</Seperator>
        <div>
          For a list of available commands, type `<Cmd>help</Cmd>`.
        </div>
      </div>
      <div className="illu-section">
        {/* Add additional illustration or content here if needed */}
      </div>
    </HeroContainer>
  );
};

export default Welcome;
