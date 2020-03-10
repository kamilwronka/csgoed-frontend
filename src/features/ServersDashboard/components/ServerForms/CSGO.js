import React from "react";
import { Form, Input, InputNumber, Radio, Checkbox, Select } from "antd";
import { Field, setNestedObjectValues } from "formik";
import { useTranslation } from "react-i18next";

const steamAPIKEY = "C69AD7BF803CA04923557279ACB965F0";
const { Option } = Select;

function CreateCSGOForm({
  errors,
  touched,
  values,
  setFieldValue,
  setTouched
}) {
  const { t } = useTranslation();

  // name, serverName, rconPassword, serverPassword, fpsMax, tickrate, maxPlayers, region, startMap, mapGroup

  return (
    <>
      <Form.Item
        label={t("servers.form.csgo.csgoServerName")}
        validateStatus={
          errors.csgoServerName && touched.csgoServerName ? "error" : ""
        }
        help={
          errors.csgoServerName && touched.csgoServerName
            ? errors.csgoServerName
            : ""
        }
      >
        <Field
          id="csgoServerName"
          name="csgoServerName"
          type="text"
          as={Input}
        />
      </Form.Item>
      <Form.Item
        label={t("servers.form.csgo.srcdsToken")}
        validateStatus={errors.srcdsToken && touched.srcdsToken ? "error" : ""}
        help={
          <>
            Can be obtained from:{" "}
            <a
              href="https://steamcommunity.com/dev/managegameservers"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://steamcommunity.com/dev/managegameservers
            </a>
          </>
        }
      >
        <Field id="srcdsToken" name="srcdsToken" type="text" as={Input} />
      </Form.Item>
      <Form.Item
        label={t("servers.form.csgo.rconPassword")}
        validateStatus={
          errors.rconPassword && touched.rconPassword ? "error" : ""
        }
        help={
          errors.rconPassword && touched.rconPassword ? errors.rconPassword : ""
        }
      >
        <Field
          id="rconPassword"
          name="rconPassword"
          type="text"
          as={Input.Password}
        />
      </Form.Item>
      <Form.Item
        label={t("servers.form.csgo.serverPassword")}
        validateStatus={
          errors.serverPassword && touched.serverPassword ? "error" : ""
        }
        help={
          errors.serverPassword && touched.serverPassword
            ? errors.serverPassword
            : ""
        }
      >
        <Field
          id="serverPassword"
          name="serverPassword"
          type="text"
          as={Input.Password}
        />
      </Form.Item>
      <Form.Item
        label={t("servers.form.csgo.fpsMax")}
        validateStatus={errors.fpsMax && touched.fpsMax ? "error" : ""}
        help={errors.fpsMax && touched.fpsMax ? errors.fpsMax : ""}
      >
        <Field
          id="fpsMax"
          name="fpsMax"
          type="number"
          as={Input}
          disabled={values.fpsUncapped}
        />
        <Checkbox
          value={values.fpsUncapped}
          onChange={e => setFieldValue("fpsUncapped", e.target.checked)}
          style={{ marginTop: 8 }}
        >
          {t("servers.form.csgo.fpsUncapped")}
        </Checkbox>
      </Form.Item>
      <Form.Item
        label={t("servers.form.csgo.maxPlayers")}
        validateStatus={errors.maxPlayers && touched.maxPlayers ? "error" : ""}
        help={errors.maxPlayers && touched.maxPlayers ? errors.maxPlayers : ""}
      >
        <Field id="maxPlayers" name="maxPlayers" type="number" as={Input} />
      </Form.Item>
      <Form.Item
        label={t("servers.form.csgo.tickrate")}
        validateStatus={errors.tickrate && touched.tickrate ? "error" : ""}
        help={errors.tickrate && touched.tickrate ? errors.tickrate : ""}
      >
        <Radio.Group
          value={values.tickrate}
          defaultValue="128"
          onChange={e => setFieldValue("tickrate", e.target.value)}
        >
          <Radio value="64">64</Radio>
          <Radio value="128">128</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={t("servers.form.csgo.startMap")}
        validateStatus={errors.startMap && touched.startMap ? "error" : ""}
        help={errors.startMap && touched.startMap ? errors.startMap : ""}
      >
        <Select
          id="startMap"
          name="startMap"
          value={values.startMap}
          onChange={value => setFieldValue("startMap", value)}
          onBlur={() =>
            !touched.startMap && setTouched({ ...touched, startMap: true })
          }
        >
          <Option value={"de_dust2"}>de_dust2</Option>
          <Option value={"de_mirage"}>de_mirage</Option>
          <Option value={"de_cache"}>de_cache</Option>
          <Option value={"de_inferno"}>de_inferno</Option>
          <Option value={"de_overpass"}>de_overpass</Option>
          <Option value={"de_nuke"}>de_nuke</Option>
          <Option value={"de_vertigo"}>de_vertigo</Option>
        </Select>
      </Form.Item>

      {/* <Form.Item
        label={t("servers.form.csgo.mapGroup")}
        validateStatus={errors.mapGroup && touched.mapGroup ? "error" : ""}
        help={errors.mapGroup && touched.mapGroup ? errors.mapGroup : ""}
      >
        <Field id="mapGroup" name="mapGroup" type="text" as={Input} />
      </Form.Item> */}
    </>
  );
}

export default CreateCSGOForm;
