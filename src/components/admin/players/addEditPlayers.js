import React, { Component } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";

import FormField from "../../utils/formFields";
import { validate } from "../../utils/misc";

import FileUploader from "../../utils/fileUploader";

import { firebasePlayers, firebaseDB, firebase } from "../../../firebase";

class AddEditPlayers extends Component {
  state = {
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Player name",
          name: "name_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          label: "Player last name",
          name: "lastname_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      number: {
        element: "input",
        value: "",
        config: {
          label: "Player number",
          name: "number_input",
          type: "number"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      position: {
        element: "select",
        value: "",
        config: {
          label: "Select a position",
          name: "select_position",
          type: "select",
          options: [
            { key: "Keeper", value: "Keeper" },
            { key: "Defence", value: "Defence" },
            { key: "Midfield", value: "Midfield" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: true
        },
        valid: false
      }
    }
  };

  componentDidMount() {
    const playerId = this.props.match.params.id;

    if (!playerId) {
      this.setState({
        formType: "Add player"
      });
    } else {
      // TODO:
    }
  }

  updateForm(element, content = "") {
    const newFormData = {
      ...this.state.formData
    };
    const newElement = {
      ...newFormData[element.id]
    };

    if (content === "") {
      newElement.value = element.e.target.value;
    } else {
      newElement.value = content;
    }

    let valiData = validate(newElement);

    newElement.valid = valiData[0];
    newElement.validationMessage = valiData[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    });
  }

  submitForm(e) {
    e.preventDefault();

    let dataToSubmit = {};
    console.log(dataToSubmit);
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      if (this.state.formType === "Edit Player") {
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm("Updated corretly");
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      } else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push("/admin_players");
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  }
  resetImage = () => {
    const newFormData = { ...this.state.formData };
    newFormData["image"].value = "";
    newFormData["image"].valid = false;
    this.setState({
      defaultImg: "",
      formData: newFormData
    });
  };
  storeFilename = filename => {
    this.updateForm({ id: "image" }, filename);
  };
  render() {
    const {
      formType,
      formData,
      formSuccess,
      formError,
      defaultImg
    } = this.state;
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{formType}</h2>
          <div>
            <form onSubmit={e => this.submitForm(e)}>
              <FileUploader
                dir="players"
                tag={"Player image"}
                defaultImg={defaultImg}
                defaultImgName={formData.image.value}
                resetImage={() => this.resetImage()}
                filename={filename => this.storeFilename(filename)}
              />
              <FormField
                id={"name"}
                formData={formData.name}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"lastname"}
                formData={formData.lastname}
                change={element => this.updateForm(element)}
              />

              <FormField
                id={"number"}
                formData={formData.number}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"position"}
                formData={formData.position}
                change={element => this.updateForm(element)}
              />
              <div className="success_label">{formSuccess}</div>
              {formError ? (
                <div className="error_label">Something is wrong</div>
              ) : null}
              <div className="admin_submit">
                <button onClick={e => this.submitForm(e)}>{formType}</button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayers;
