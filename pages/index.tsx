import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <Background>
      <Container>
        <Header>
          <Logo>Saga</Logo>
          <li>
            <Link href="/signup">
              <Login>Get started</Login>
            </Link>
          </li>
        </Header>
        <style jsx global>{`
          body,
          html {
            background: rgb(25, 24, 26);
          }
        `}</style>
        <TextContainer>
          <Title>
            <div style={{ display: "flex", alignItems: "center" }}>
              The
              <span>
                <InnerTitle>last profile</InnerTitle>
              </span>
            </div>
            you&apos;ll ever need
          </Title>
        </TextContainer>
        <SectionContainer>
          <Subheader>
            The <SubheaderInner>last profile</SubheaderInner> you&apos;ll ever
            need
          </Subheader>
          <DisplayPhoto alt="Profile example" src="/profile-example.png" />
        </SectionContainer>

        <SectionContainer>
          <DisplayPhoto alt="Portfolio example" src="/portfolio-example.png" />
          <div style={{ marginRight: "50px" }}></div>
          <Subheader>
            Where <SubheaderInner>profiles</SubheaderInner> and{" "}
            <SubheaderInner>portfolios</SubheaderInner> come together
          </Subheader>
        </SectionContainer>
        <div>
          <MiddleHeader>
            One <MiddleEmphasis>click. </MiddleEmphasis>
            Hundreds of
            <MiddleEmphasis> applications.</MiddleEmphasis>
          </MiddleHeader>
        </div>
        <SectionContainer>
          <Subheader>
            Your new <SubheaderInner>best hire</SubheaderInner> lives here
          </Subheader>
          <DisplayVideo src="/recruiter-video.mp4" autoPlay muted loop />
        </SectionContainer>
        <div style={{ marginBottom: "100px" }}></div>
        <VerticalContainer>
          <VerticalImage alt="Portfolio example" src="/inner-circle.png" />
          <div style={{ marginRight: "50px" }}></div>
          <VerticalText>
            Find your <SubheaderInner>inner circle</SubheaderInner>
          </VerticalText>
        </VerticalContainer>
        <div style={{ paddingBottom: "100px" }}></div>
      </Container>
    </Background>
  );
}

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Background = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: rgb(25, 24, 26);
`;

const Header = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 70px;
  list-style-type: none;
`;

const Logo = styled.li`
  color: white;
  font-size: 2rem;
  font-weight: 700;
`;

const Login = styled.a`
  background-color: rgb(72, 71, 71);
  padding: 12px 20px;
  color: white;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 75vh;
`;

const Title = styled.h1`
  color: white;
  font-size: 8rem;
  font-weight: 400;
  line-height: 1.2;
  margin-top: 140px;
  padding: 0 50px;
`;

const InnerTitle = styled.p`
  font-weight: 700;
  font-size: 8rem;
  margin-left: 30px;
  color: rgb(225, 209, 158);
`;

const SectionContainer = styled.div`
  min-height: 80vh;
  padding: 0 120px;
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;

const Subheader = styled.p`
  color: white;
  font-size: 5rem;
  font-weight: 500;
  line-height: 1.2;
`;

const SubheaderInner = styled.span`
  font-weight: 800;
  color: rgb(225, 209, 158);
`;

const DisplayPhoto = styled.img`
  max-width: 45%;
  object-fit: cover;
  border-radius: 10px;
`;

const DisplayVideo = styled.video`
  max-width: 45%;
  object-fit: cover;
  border-radius: 10px;
`;

const MiddleHeader = styled.p`
  padding: 0 90px;
  color: white;
  font-size: 6rem;
  text-align: center;
  margin: 22vh 0;
`;

const MiddleEmphasis = styled.span`
  color: rgb(189, 216, 158);
  font-weight: 800;
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VerticalText = styled.p`
  padding: 0 90px;
  color: white;
  font-size: 6rem;
  text-align: center;
  line-height: 1;
`;

const VerticalImage = styled.img`
  transform: scale(1.1);
  max-width: 45%;
  object-fit: cover;
  margin-bottom: 50px;
  border-radius: 10px;
`;
