import { Button, Form, Modal, Tabs, Upload, message } from "antd";
import Input from "antd/es/input/Input";
import { antValidatioError } from "../../../helpers";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/loadersSlice";
import { AddArtist, UpadteArtist } from "../../../apis/artists";
import { UploadImage } from "../../../apis/images";
import moment from "moment";
import Item from "antd/es/list/Item";
import { useState } from "react";

function ArtistModalForm({
  showArtistModal,
  setShowArtistModal,
  selectedArtist,
  reloadData,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("1");
  const [file, setFile] = useState(null);
  if (selectedArtist) {
    selectedArtist.dob = moment(selectedArtist.dob).format("YYYY-MM-DD");
  }
  const onSubmit = async (values) => {
    console.log("selected", selectedArtist);
    try {
      dispatch(setLoading(true));
      // const response = await AddArtist(values);
      let response;
      if (selectedArtist) {
        response = await UpadteArtist(selectedArtist._id, values);
      } else {
        response = await AddArtist(values);
      }
      reloadData();
      dispatch(setLoading(false));
      setShowArtistModal(false);
      console.log("res====", response);
      message.success(response.message);
    } catch (error) {
      message.error(error.message);
      dispatch(setLoading(false));
    }
  };
  const imageUpload = async () => {
    console.log("File-----------", file);
    try {
      const formData = new FormData();
      formData.append("image", file);
      console.log("formdata", formData);
      dispatch(setLoading(true));
      const response = await UploadImage(formData);
      console.log("slected in image upload", selectedArtist);
      if (response.success) {
        await UpadteArtist(selectedArtist._id, {
          ...selectedArtist,
          images: [...(selectedArtist?.images || []), response.data],
        });
      }
      reloadData();
      dispatch(setLoading(false));
      message.success(response.message);
      setShowArtistModal(false);
    } catch (error) {
      message.error(error.message);
      dispatch(setLoading(false));
    }
  };
  const deleteImage = async (image) => {
    console.log("image",image)
    try {
      dispatch(setLoading(true));
      const response = await UpadteArtist(selectedArtist._id, {
        ...selectedArtist,
        images: selectedArtist?.images?.filter((item) => item !== image),
      });
      reloadData();
      dispatch(setLoading(false));
      message.success(response.message);
      setShowArtistModal(false);
    } catch (error) {
      message.error(error.message);
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <Modal
        open={showArtistModal}
        onCancel={() => setShowArtistModal()}
        title={selectedArtist ? "Edit Artist" : "Add Artist"}
        centered
        width={800}
        okText={selectedArtist ? "Update" : "Add"}
        onOk={() => {
          if (selectedTab == "1") {
            form.submit();
          } else {
            imageUpload();
          }
        }}
      >
        <Tabs
          defaultActiveKey="1"
          onChange={(key) => {
            setSelectedTab(key);
          }}
        >
          <Item tab="Basic Info" key="1">
            <Form
              layout="vertical"
              className="flex flex-col gap-5"
              form={form}
              onFinish={onSubmit}
              initialValues={selectedArtist}
            >
              <Form.Item label="Name" name="name" rules={antValidatioError}>
                <Input></Input>
              </Form.Item>
              <div className="grid grid-cols-2 gap-5">
                <Form.Item label="DOB" name="dob" rules={antValidatioError}>
                  <Input type="date"></Input>
                </Form.Item>
                <Form.Item
                  label="DEBUT YEAR"
                  name="debutYear"
                  rules={antValidatioError}
                >
                  <Input type="number"></Input>
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Form.Item
                  label="PROFESSION"
                  name="profession"
                  rules={antValidatioError}
                >
                  <select>
                    <option value="Actor">Actor</option>
                    <option value="Acteress">Acteress</option>
                    <option value="Director">Dierector</option>
                    <option value="Producer">Producer</option>
                    <option value="Music Director">Music Director</option>
                    <option value="Singer">Singer</option>
                    <option value="Lyricist">Lyricist</option>
                    <option value="Cinematographer">Cinematographer</option>
                    <option value="Editor">Editor</option>
                  </select>
                </Form.Item>
                <Form.Item
                  label="DEBUT MOVIES"
                  name="debutMovie"
                  rules={antValidatioError}
                >
                  <Input type="text"></Input>
                </Form.Item>
              </div>
              <Form.Item label="BIO" name="bio" rules={antValidatioError}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                label="PROFILE PIC"
                name="images"
                rules={antValidatioError}
              >
                <Input type="text"></Input>
              </Form.Item>
            </Form>
          </Item>
          <Item tab="Image" key="2" disabled={!selectedArtist}>
          <div className="flex flex-wrap gap-5 mb-10">
            {selectedArtist?.images?.map((image) => (
              <div key={image} className="flex gap-5 border border-dashed p-3 ">
                <img
                  src={selectedArtist?.images?.[0]}
                  alt=""
                  className="w-20 h-20 object-cover"
                ></img>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 float-right"
                  onClick={() => {
                    deleteImage(image);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            ))}
            </div>

            <Upload
              // fileList={[file]}
              onChange={(info) => {
                setFile(info.file);
                console.log("info file", info);
              }}
              beforeUpload={() => false}
              listType="picture"
            >
              <Button> upload</Button>
            </Upload>
          </Item>
        </Tabs>
      </Modal>
    </div>
  );
}

export default ArtistModalForm;
