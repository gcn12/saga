import Link from "next/link";
import styled from "styled-components";
import Spacer from "../components/Shared/Spacer";

export default function Home() {
  return (
    <Background>
      <Container>
        <Header>
          <Logo>Saga</Logo>
          <ButtonsContainer>
            <Link href="/login" passHref>
              <Signup>Log in</Signup>
            </Link>
            <Spacer size={16} axis="x" />
            <Link href="/signup" passHref>
              <LogIn>Get started</LogIn>
            </Link>
          </ButtonsContainer>
        </Header>
        <style jsx global>{`
          body,
          html {
            background: #fefcff;
          }
        `}</style>
        <TextContainer>
          <Title>
            The
            <InnerTitle>last profile</InnerTitle> you&apos;ll ever need
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
  background-color: #fefcff;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 70px;
  list-style-type: none;
`;

const Logo = styled.p`
  color: #000000;
  font-size: 2rem;
  font-weight: 700;
`;

const Signup = styled.a`
  background-color: transparent;
  padding: 12px 20px;
  color: rgb(72, 71, 71);
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 100ms ease-in-out;
`;

const LogIn = styled.a`
  background-color: rgb(72, 71, 71);
  padding: 12px 20px;
  color: white;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 100ms ease-in-out;
  &:hover {
    background-color: rgb(90, 90, 90);
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 75vh;
`;

const Title = styled.h1`
  color: #000000;
  font-size: 7rem;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 140px;
  padding: 0 50px;
  text-align: center;
  max-width: 800px;
`;

const InnerTitle = styled.span`
  font-weight: 700;
  font-size: 7rem;
  margin-left: 30px;
  color: rgb(179, 166, 124);
`;

const SectionContainer = styled.div`
  min-height: 80vh;
  padding: 0 120px;
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;

const Subheader = styled.p`
  color: #000000;
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

const ButtonsContainer = styled.div`
  display: flex;
`;
