import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin, updateUser } from "../Actions/UserAction";
import LoadingBox from "../Components/boxInfor/LoadingBox";
import MessageBox from "../Components/boxInfor/MessageBox";
import { USER_UPDATE_RESET } from "../Constants/UserConstants";
import { validUserName } from "../regex";

function FormInfo(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [errorName, setErrorName] = useState(false);

  const userUpdate = useSelector((state) => state.userUpdate);
  let submit = true;
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;
  const dispatch = useDispatch();

  const userSigninGG = useSelector((state) => state.userSigninGG);
  const { data } = userSigninGG;

  const userSigninFB = useSelector((state) => state.userSigninFB);
  const { datafb } = userSigninFB;

  const validate = () => {
    if (!validUserName.test(name)) {
      setErrorName(true);
      submit = false;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    validate();
    if (data) {
      const { id, email } = data;
      setEmail(email);
      submit && dispatch(updateUser(id, name));
    }
    if (datafb) {
      const { id, email } = datafb;
      setEmail(email);
      submit && dispatch(updateUser(id, name));
    }
  };
  useEffect(() => {
    if (successUpdate) {
      if (data) {
        dispatch(signin(name, data.password));
      }
      if (datafb) {
        dispatch(signin(name, datafb.password));
      }
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push("/");
    }
  }, [dispatch, props.history, successUpdate]);

  useEffect(() => {
    submit = true;
  }, [errorName]);
  return (
    <div className="_2XRSuf">
      <form onSubmit={submitHandler}>
        <div className="_1jDxWZ _34gSQ-">
          <div className="Xqnqjs">
            <div className="_3qVJYR">
              <div className="_3p_roN _3eCQOY">
                <div className="ZWZ4ab">Đăng ký với Google</div>
              </div>
            </div>
          </div>
          <div className="_3e4zDA">
            <div></div>
            <div className="_2_QpGk _3nm8yw">
              <img
                alt="icon"
                className="_2HCc0n"
                src="https://lh3.googleusercontent.com/a/AATXAJzDchiFdnOXzNrRP38YlFN2m5690CW7_nGafikI=s96-c"
              />
            </div>
            <div className="_18qY2-">
              <div className="_3mizNj">
                <input
                  className="yReWDs"
                  type="text"
                  placeholder="Tên đăng nhập"
                  name="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="_2RHkvG"></div>
            </div>
            <div className="_18qY2-">
              <div className="_3mizNj">
                <input
                  className="yReWDs"
                  type="text"
                  placeholder="Email (Không bắt buộc)"
                  name="email"
                  defaultValue={
                    data ? data.email : datafb ? datafb.email : email
                  }
                />
              </div>
              <div className="_2RHkvG"></div>
            </div>
            <div className="_2KbZSJ">
              <span className="R49cvp">
                Bằng việc đăng kí, bạn đã đồng ý với Shopee về
              </span>
              <a
                href="https://shopee.vn/legaldoc/termsOfService/?__classic__=1"
                className="_3LmzHH"
                target="_blank"
                rel="noopener noreferrer"
              >
                Điều khoản dịch vụ
              </a>
              <span className="_1YqulL">&amp;</span>
              <a
                href="https://shopee.vn/legaldoc/privacy/?__classic__=1"
                className="_3LmzHH"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chính sách bảo mật
              </a>
            </div>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            <div className="JIoEIt">
              <button className="_1ruZ5a _3Nrkgj _3kANJY _1ExuWp hh2rFL _2Exa8W">
                Trở Lại
              </button>
              <button
                className="_1ruZ5a _3Nrkgj _3kANJY _1ExuWp hh2rFL _3_offS"
                disabled=""
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormInfo;
