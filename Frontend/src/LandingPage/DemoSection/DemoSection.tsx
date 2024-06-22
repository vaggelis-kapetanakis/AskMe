import { Button } from "../ButtonElement";
import {
  DemoContainer,
  DemoRow,
  DemoWrapper,
  TopLine,
  TextWrapper,
  Heading,
  Column1,
  Column2,
  Video,
  VideoWrap,
  BtnWrap,
  Subtitle,
} from "./DemoElements";
import VideoDemo from "../../assets/video/demo-video.mp4";

const DemoSection = () => {
  return (
    <>
      <DemoContainer id="demo">
        <DemoWrapper>
          <DemoRow>
            <Column1>
              <VideoWrap>
                <Video autoPlay loop muted src={VideoDemo} />
              </VideoWrap>
            </Column1>
            <Column2>
              <TextWrapper>
                <TopLine>Check out our demo</TopLine>
                <Heading>Easy and Quick</Heading>
                <Subtitle>
                  We provide the easiest way to ask or answer a question as
                  shown in the demo on the left.
                </Subtitle>
                <BtnWrap>
                  <Button to="/login" exact="true" offset={-80}>
                    Sign Up Today
                  </Button>
                </BtnWrap>
              </TextWrapper>
            </Column2>
          </DemoRow>
        </DemoWrapper>
      </DemoContainer>
    </>
  );
};

export default DemoSection;
