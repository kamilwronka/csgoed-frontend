import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Button } from "antd";
import { useTranslation } from "react-i18next";

function getProperFlag(lang) {
  return import(`resources/images/${lang}_flag.svg`);
}

const LANGUAGES = [
  { value: "en", name: "English" },
  { value: "pl", name: "Polish" }
];

function LanguageMenu() {
  const [popoverOpen, setPopover] = useState();
  const [lang, setLang] = useState("en");
  const [flag, setFlag] = useState("");
  const { t } = useTranslation();

  function togglePopover() {
    setPopover(!popoverOpen);
  }

  function handleLanguageChange(e) {
    setLang(e.target.value);
  }

  useEffect(() => {
    getProperFlag(lang).then(flag => {
      setFlag(flag.default);
    });
  }, [lang]);

  return (
    <Dropdown
      overlay={
        <Menu>
          {LANGUAGES.map(language => {
            return (
              <Menu.Item key={language.value}>
                <Button
                  type="link"
                  onClick={handleLanguageChange}
                  value={language.value}
                >
                  {language.name}
                </Button>
              </Menu.Item>
            );
          })}
        </Menu>
      }
      trigger="click"
      overlayStyle={{ marginTop: 10 }}
    >
      <div
        onClick={togglePopover}
        style={{ height: 48, transform: "translateY(-10px)" }}
      >
        <img
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            objectFit: "cover"
          }}
          src={flag}
          alt={flag}
        />
      </div>
    </Dropdown>
  );
}

export default LanguageMenu;
