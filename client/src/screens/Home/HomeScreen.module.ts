import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container__button: {
    marginTop: 15,
  },
  button: {
    backgroundColor: '#2a9d8f',
    width: '70%',
    margin: 'auto',
    padding: 16,
    borderRadius: 4,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listMembers: {
    margin: 'auto',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 25,
  },
  memberContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  memberName: {
    fontWeight: 'bold',
    color: '#004e98',
    fontSize: 20,
  },
  memberEmail: {
    fontSize: 14,
    color: '#005f73',
  },
  deleteButton: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  icon: {
    color: '#264653',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flatListContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  noMembers: {
    margin: 'auto',
  }
});

export default styles;