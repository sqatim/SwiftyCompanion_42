import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { useLocation } from "react-router-native";
import styled from "styled-components/native";
import SelectList from "react-native-dropdown-select-list";

const selectCursus = (cursus) => {
  const cursusTmp = [];
  cursus.map((element, key) => {
    console.log("level", element.level);
    cursusTmp.push({ key: element.cursus.name, value: element.cursus.name });
  });
  console.log("cursusTmp:", cursusTmp);
  return cursusTmp;
};

export default function User({ navigation, route }) {
  const userData = route.params;
  const [selected, setSelected] = React.useState(
    userData.cursus[0].cursus.name
  );
  const [skills, setSkills] = useState({ check: false, skills: [] });
  const data = selectCursus(userData.cursus);
  const [level, setLevel] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const renderItem = ({ item }) => {
    if (typeof item.final_mark == "number")
      return (
        <ProjectStyle>
          <ProjectTitleStyle>{item.project.name}</ProjectTitleStyle>
          <ProjectNoteStyle status={item.status} finalMark={item.final_mark}>
            {item.final_mark}
          </ProjectNoteStyle>
        </ProjectStyle>
      );
    else return null;
  };
  useEffect(() => {
    const result = userData.cursus.find(
      (element) => element.cursus.name == selected
    );
    setSkills((prev) => ({ ...prev, skills: result.skills }));
    setLevel(result.level);
    setPercentage(result.level.toString().split(".")[1]);
    // console.log("projects:", userData.projects);
  }, [selected]);

  useEffect(() => {
    console.log("skills:", skills);
  }, [skills]);
  return (
    <FlatListStyle
      ListHeaderComponent={
        <ContainerStyle>
          <WrapperStyle>
            <PictureStyle source={{ uri: userData.picture }}></PictureStyle>
            <DetailsContainerStyle>
              <DetailStyle>
                <DetailTextStyle>Login</DetailTextStyle>
                <DetailTextStyle>{userData.login}</DetailTextStyle>
              </DetailStyle>
              <DetailStyle>
                <DetailTextStyle>Wallet</DetailTextStyle>
                <DetailTextStyle>{userData.wallet} ₳</DetailTextStyle>
              </DetailStyle>
              <DetailStyle>
                <DetailTextStyle>Location</DetailTextStyle>
                <DetailTextStyle>
                  {userData.location || "Unavailable"}
                </DetailTextStyle>
              </DetailStyle>
              <DetailStyle>
                <DetailTextStyle>Evaluation points</DetailTextStyle>
                <DetailTextStyle>{userData.correction}</DetailTextStyle>
              </DetailStyle>
            </DetailsContainerStyle>
          </WrapperStyle>
          <CursusStyle>
            <SelectStyle>
              <SelectList
                setSelected={setSelected}
                data={data}
                search={false}
                defaultOption={{
                  key: userData.cursus[0].cursus.name,
                  value: userData.cursus[0].cursus.name,
                }}
              />
            </SelectStyle>
            <LevelBarStyle>
              <PercentageBarStyle percentage={percentage}></PercentageBarStyle>
              <LevelTextStyle>level: {level}%</LevelTextStyle>
            </LevelBarStyle>
          </CursusStyle>
        </ContainerStyle>
      }
      data={userData.projects}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
    //   <FlatList
    //   />
    // </FlatList>
  );
}

const ContainerStyle = styled.View`
  width: 100%;
  /* background-color: white; */
`;

const PictureStyle = styled.Image`
  width: 125px;
  height: 100%;
  /* margin-right: 10px; */
  border-radius: 50px;
`;
const WrapperStyle = styled.View`
  width: 100%;
  height: 155px;
  flex-direction: row;
  justify-content: space-between;
`;

const DetailsContainerStyle = styled.View`
  height: 100%;
  justify-content: space-around;
`;

const DetailStyle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 220px;
`;

const DetailTextStyle = styled.Text``;

const LevelBarStyle = styled.View`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 0.4px solid #000;
  margin: 15px 0 0;
  background-color: #252c2a;
  overflow: hidden;
  position: relative;
`;
const PercentageBarStyle = styled.View`
  height: 100%;
  background-color: #01babc;
  justify-content: center;
  width: ${({ percentage }) => percentage + "%"};
`;

const LevelTextStyle = styled.Text`
  color: #fff;
  text-align: center;
  position: absolute;
  left: 40%;
  top: 25%;
  height: 100%;
  /* transform: translateY(50%); */
`;

const ProjectStyle = styled.View`
  width: 100%;
  justify-content: space-between;
  padding: 15px;
  background-color: #e9f3f8;
  margin: 15px 0;
  border-radius: 8px;
`;
const ProjectTitleStyle = styled.Text`
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 16px;
`;
const ProjectNoteStyle = styled.Text`
  color: ${({ status, finalMark }) => {
    // console.log("finalMark:", finalMark);
    if (status == "in_progress") return "yellow";
    else if ((status = "finished" && finalMark == 0)) return "red";
    else return "green";
  }};
  align-self: flex-end;
  font-weight: 500;
  font-size: 18px;
`;

const CursusStyle = styled.View`
  /* flex-direction: row; */
`;

const TestStyle = styled.View`
  height: 50px;
`;

const SelectStyle = styled.View`
  /* width: 125px; */
  margin-top: 15px;
`;

const FlatListStyle = styled.FlatList`
  background-color: white;
  padding: 15px;
`;
