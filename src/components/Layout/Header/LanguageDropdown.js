import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { connect } from 'react-redux'
import * as ACT from '../../../actions';

// falgs
import English from "../../../assets/images/language/english.jpg";
import French from "../../../assets/images/language/french.jpg";
import Chinese from "../../../assets/images/language/chinese.jpg";
import Japanese from "../../../assets/images/language/japanese.jpg";
import Taiwan from "../../../assets/images/language/taiwan.jpg";

var languages = [
  { title: 'English', key: 'en', flag: English },
  { title: 'française', key: 'fr', flag: French },
  { title: '简体中文', key: 'cn', flag: Chinese },
  { title: '繁體中文', key: 'tw', flag: Japanese },
  { title: '日本語', key: 'ja', flag: Taiwan }
];


const LanguageDropdown = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [flag, setFlag] = useState(English);
  const [lng, setLng] = useState("English");

  function changeLanguageAction(item) {
    props.setLanagugae(item)
    const lng = item.key;
    
    if (lng === "en") {
      setFlag(English);
      setLng('English');
    } else if (lng === "fr") {
      setFlag(French);
      setLng('French');
    }
    else if (lng === "cn") {
      setFlag(Chinese);
      setLng('简体中文');
    }
    else if (lng === "tw") {
      setFlag(Japanese);
      setLng('繁體中文');
    }
    else if (lng === "ja") {
      setFlag(Taiwan);
      setLng('日本語');
    }
  }


  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          tag="button"
        >
          <img
            src={flag}
            alt="Skote"
            height="16"
            className="mr-1"
          />
          <span className="align-middle">{lng}</span>
        </DropdownToggle>
        <DropdownMenu className="language-switch" right>
          {languages.map((item,index) =>
            <DropdownItem key={index} tag="a" href="#" onClick={() => changeLanguageAction(item)} className="notify-item">
              <img src={item.flag} alt="Skote" className="mr-1" height="12" />
              <span className="align-middle">{item.title}</span>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    setLanagugae: (language) => dispatch(ACT.setLanagugae(language))
  }
}

export default connect(null, mapDispatchToProps)(LanguageDropdown)
