import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  submitButton: {
    width: '70%',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a9d8f',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButtonEnabled: {
    width: '70%',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a9d8f',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ced4da',
    color: '#495057',
  },
  error: {
    fontWeight: 'bold',
    margin: 'auto',
    color: '#e63946',
  },
});

export default styles;