import React from 'react';
import * as RN from 'react-native';
import {Types, Sleeper} from '@sleeperhq/mini-core';

type OwnProps = {
  context: Types.Context;
};

const Actions = (props: OwnProps) => {
  const {context} = props;

  const user = context?.user;
  const league = context?.league;
  const actions = context?.actions;

  const renderTabList = () => {
    const screens: {screen: Types.NavigationTabId; name: string}[] = [
      {screen: 'LeaguesIndexScreen', name: 'Fantasy'},
      {screen: 'ScoreIndexScreen', name: 'Scores'},
      {screen: 'PicksIndexScreen', name: 'Games'},
      {screen: 'FeedIndexScreen', name: 'Feed'},
      {screen: 'InboxIndexScreen', name: 'Inbox'},
      {screen: 'MinisIndexScreen', name: 'Minis'},
    ];

    return (
      <RN.View style={styles.itemContainer}>
        <Sleeper.Text style={styles.header}>Pick a Tab:</Sleeper.Text>
        <RN.FlatList
          style={styles.horizontalScroll}
          horizontal={true}
          data={screens}
          renderItem={({item}) => (
            <RN.View style={styles.tabItem}>
              <Sleeper.Button
                text={item.name}
                onPress={() => actions.navigate?.(item.screen)}
              />
            </RN.View>
          )}
        />
      </RN.View>
    );
  };

  return (
    <RN.View style={styles.container}>
      {renderTabList()}
      <RN.View style={styles.itemContainer}>
        <RN.View style={styles.horizontal}>
          <RN.Image
            style={styles.userAvatar}
            source={{
              uri: `https://sleepercdn.com/avatars/${user?.avatar}`,
            }}
          />
          <Sleeper.Jersey
            style={styles.jersey}
            sport={'nfl'}
            number={'42'}
            fill={'green'}
          />
        </RN.View>
        <RN.View style={styles.horizontal}>
          <Sleeper.Text style={styles.header}>User:</Sleeper.Text>
          <Sleeper.Text style={styles.text}>
            {` ${user?.display_name}`}
          </Sleeper.Text>
        </RN.View>

        <RN.View style={styles.horizontal}>
          <Sleeper.Text style={styles.header}>Cookies:</Sleeper.Text>
          <Sleeper.Text style={styles.text}>{` ${user?.cookies}`}</Sleeper.Text>
        </RN.View>
      </RN.View>
      <RN.View style={styles.itemContainer}>
        <Sleeper.Text style={styles.header}>Selected League:</Sleeper.Text>
        {!!league && (
          <RN.View style={styles.horizontal}>
            <RN.Image
              style={styles.leagueAvatar}
              source={{
                uri: `https://sleepercdn.com/avatars/${league?.avatar}`,
              }}
            />
            <Sleeper.Text style={styles.text}>{league?.name}</Sleeper.Text>
          </RN.View>
        )}
        {!league && <Sleeper.Text style={styles.text}>-none-</Sleeper.Text>}
      </RN.View>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    width: 50,
    height: 50,
  },
  leagueAvatar: {
    width: 25,
    height: 25,
  },
  text: {
    fontSize: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  horizontal: {
    flexDirection: 'row',
  },
  horizontalScroll: {
    height: 40,
    flexGrow: 0,
  },
  itemContainer: {
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 5,
  },
  jersey: {
    width: 50,
    height: 50,
  },
  tabItem: {
    paddingHorizontal: 3,
  },
});

export default Actions;
