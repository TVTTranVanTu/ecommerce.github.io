import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Actions/CartAction";
import { postCommentAction, productCatDetail } from "../Actions/CategoryAction";
import LoadingBox from "../Components/boxInfor/LoadingBox";
import MessageBox from "../Components/boxInfor/MessageBox";
import Rating from "../Components/rating/Rating";

function ProductScreen(props) {
  const id = props.match.params.id;
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, productInfo } = productDetail;
  console.log(productInfo);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("L");

  const postComment = useSelector((state) => state.postComment);
  const {
    loading: loadingCreatePost,
    error: errorCreatePost,
    success,
  } = postComment;
  console.log(postComment);
  const postCommentHandle = (productInfo) => {
    const post = {
      content: comment,
      rating: star,
      post: {
        id: productInfo.id,
      },
    };
    console.log(post);
    dispatch(postCommentAction(post));
  };

  const reductionHandle = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };
  const increaseHandle = () => {
    if (qty < productInfo.quantity) {
      setQty(qty + 1);
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(productCatDetail(id));
    }
    success && setComment("");
  }, [dispatch, id, success]);

  const BuyToCardHandle = () => {
    dispatch(addToCart(id, qty, size));
    props.history.push(`/cart/${id}?qty=${qty}&size=${size}`);
  };
  const AddToCardHandle = () => {
    dispatch(addToCart(id, qty, size));
    props.history.goBack();
  };
  return (
    <div className="product__screen">
      <div className="container">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox></MessageBox>
        ) : (
          <div className="page-product__detail">
            <div className="product__detail card">
              <div className="product__image">
                <div className="image">
                  <div
                    className="_3Q7kBy _2GchKS"
                    style={{
                      backgroundImage: `url(${productInfo.productThumbnail})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
                <div className="list__image"></div>
              </div>
              <div className="product__info">
                <div className="product__content">
                  <div className="title">
                    <span>{`[${productInfo.postTitle.toUpperCase()}]${
                      productInfo.productName
                    }`}</span>
                  </div>
                  <div className="flex avgEvalute">
                    <div className="flex evaluate-num">
                      <div className="number Evalute">
                        {productInfo.avgEvalute}
                      </div>
                      <div className="star">
                        <Rating item={productInfo.avgEvalute} />
                      </div>
                    </div>
                    <div className="flex evaluate-num">
                      <div className="Evalute">2.1k</div>
                      <div className="title-evaluate">Đánh giá</div>
                    </div>
                    <div className="flex evaluate-num hidden">
                      <div className="Evalute">{productInfo.soldQuantity}</div>
                      <div className="title-evaluate">Đã bán</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <div className="flex flex-column">
                      <div className="flex flex-column content">
                        <div className="flex items-center">
                          <div className="flex items-center _3Dt65t">
                            <div className="flex items-center">
                              <div className="_3e_UQT">
                                ₫
                                {productInfo.productPrice.toLocaleString(
                                  "vi-VN"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="_2nr4HE">
                    <div className="flex flex-column">
                      <div className="flex _3AHLrn">
                        <label className="_2IW_UG">Deal Sốc</label>
                        <div className="_141XG4">Mua để nhận quà</div>
                      </div>
                      <div className="flex _3AHLrn _2m964I">
                        <label className="_2IW_UG">Vận chuyển</label>
                        <div className="_3HMG0A aPPgp7">
                          <div className="_1szdsu">
                            <div className="R2Ygax">
                              <img
                                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/1cdd37339544d858f4d0ade5723cd477.png"
                                width="25"
                                height="15"
                                className="_2geN66"
                                alt="img"
                              />
                              Miễn Phí Vận Chuyển
                            </div>
                            <div className="gRuynh">
                              Miễn Phí Vận Chuyển khi đơn đạt giá trị tối thiểu
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex _3AHLrn _2XdAdB">
                        <div className="flex flex-column">
                          <div className="flex items-center _mrbt">
                            <label className="_2IW_UG">Size</label>
                            <div className="flex items-center _2oeDUI">
                              <button
                                className={`${
                                  size === "M"
                                    ? "product-variation active"
                                    : "product-variation"
                                }`}
                                onClick={() => setSize("M")}
                              >
                                M (dưới 46kg)
                              </button>
                              <button
                                className={`${
                                  size === "L"
                                    ? "product-variation active"
                                    : "product-variation"
                                }`}
                                onClick={() => setSize("L")}
                              >
                                L (dưới 53kg)
                              </button>
                              <button
                                className={`${
                                  size === "XL"
                                    ? "product-variation active"
                                    : "product-variation"
                                }`}
                                onClick={() => setSize("XL")}
                              >
                                XL (dưới 60kg)
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center _90fTvx">
                            <div className="_2IW_UG">Số lượng</div>
                            <div className="flex items-center">
                              <div style={{ marginRight: "15px" }}>
                                <div className="_16mL_A shopee-input-quantity">
                                  <button
                                    className="_2KdYzP"
                                    onClick={reductionHandle}
                                  >
                                    <svg
                                      enableBackground="new 0 0 10 10"
                                      viewBox="0 0 10 10"
                                      x="0"
                                      y="0"
                                      className="shopee-svg-icon "
                                    >
                                      <polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon>
                                    </svg>
                                  </button>
                                  <input
                                    className="_2KdYzP iRO3yj"
                                    type="text"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                  />
                                  <button
                                    className="_2KdYzP"
                                    onClick={increaseHandle}
                                  >
                                    <svg
                                      enableBackground="new 0 0 10 10"
                                      viewBox="0 0 10 10"
                                      x="0"
                                      y="0"
                                      className="shopee-svg-icon icon-plus-sign"
                                    >
                                      <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <div>{productInfo.quantity} sản phẩm có sẵn</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cpAMpZ">
                    <div className="_1BdIQL">
                      <button
                        type="button"
                        className="btn btn-tinted btn--l _3Kiuzg _1D3GfE"
                        aria-disabled="false"
                        onClick={AddToCardHandle}
                      >
                        <svg
                          enableBackground="new 0 0 15 15"
                          viewBox="0 0 15 15"
                          x="0"
                          y="0"
                          className="shopee-svg-icon _2FCuXA icon-add-to-cart"
                        >
                          <g>
                            <g>
                              <polyline
                                fill="none"
                                points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                              ></polyline>
                              <circle
                                cx="6"
                                cy="13.5"
                                r="1"
                                stroke="none"
                              ></circle>
                              <circle
                                cx="11.5"
                                cy="13.5"
                                r="1"
                                stroke="none"
                              ></circle>
                            </g>
                            <line
                              fill="none"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              x1="7.5"
                              x2="10.5"
                              y1="7"
                              y2="7"
                            ></line>
                            <line
                              fill="none"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              x1="9"
                              x2="9"
                              y1="8.5"
                              y2="5.5"
                            ></line>
                          </g>
                        </svg>
                        <span>thêm vào giỏ hàng</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-solid-primary btn--l _3Kiuzg"
                        aria-disabled="false"
                        onClick={BuyToCardHandle}
                      >
                        Mua ngay
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "30px",
                      borderTop: "1px solid rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="_1oVt8f flex items-center"
                      href="https://help.shopee.vn/vn/s/article/Ch%C3%ADnh-s%C3%A1ch-tr%E1%BA%A3-h%C3%A0ng-c%E1%BB%A7a-Shopee-l%C3%A0-g%C3%AC-1542942384513"
                    >
                      <img
                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/67454c89080444c5997b53109072c9e0.png"
                        className="oMlrfZ"
                        alt="img"
                      />
                      <span className="tBtxtS">Shopee Đảm Bảo</span>
                      <span>3 Ngày Trả Hàng / Hoàn Tiền</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-ratings">
              <div className="product-ratings__header">ĐÁNH GIÁ SẢN PHẨM</div>
              <div className="product-rating-overview">
                <div className="product-rating-overview__briefing">
                  <div className="product-rating-overview__score-wrapper">
                    <span className="product-rating-overview__rating-score">
                      {productInfo.avgEvalute}
                    </span>
                    <span className="product-rating-overview__rating-score-out-of">
                      {" "}
                      Trên {productInfo.avgEvalute}{" "}
                    </span>
                  </div>
                  <div className="shopee-rating-stars product-rating-overview__stars">
                    <Rating item={productInfo.avgEvalute} />
                  </div>
                </div>
                <div className="product-rating-overview__filters">
                  <div className="product-rating-overview__filter product-rating-overview__filter--active product-rating-overview__filter--all">
                    tất cả
                  </div>
                  <div className="product-rating-overview__filter">5 Sao</div>
                  <div className="product-rating-overview__filter">4 Sao</div>
                  <div className="product-rating-overview__filter">3 Sao</div>
                  <div className="product-rating-overview__filter">
                    2 Sao (0)
                  </div>
                  <div className="product-rating-overview__filter">1 Sao</div>
                  <div className="product-rating-overview__filter product-rating-overview__filter--with-comment">
                    Có Bình luận
                  </div>
                  <div className="product-rating-overview__filter product-rating-overview__filter--with-photo">
                    Có hình ảnh / video
                  </div>
                  <div className="product-rating-overview__filter product-rating-overview__filter--with-comment">
                    Bình luận
                  </div>
                </div>
              </div>
              <div className="product-ratings__list">
                {userInfo ? (
                  <div className="shopee-product-rating">
                    <a
                      className="shopee-product-rating__avatar"
                      href="/shop/235127802"
                    >
                      <div className="shopee-avatar">
                        <div className="shopee-avatar__placeholder">
                          <svg
                            enableBackground="new 0 0 15 15"
                            viewBox="0 0 15 15"
                            x="0"
                            y="0"
                            className="shopee-svg-icon icon-headshot"
                          >
                            <g>
                              <circle
                                cx="7.5"
                                cy="4.5"
                                fill="none"
                                r="3.8"
                                strokeMiterlimit="10"
                              ></circle>
                              <path
                                d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
                                fill="none"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                              ></path>
                            </g>
                          </svg>
                        </div>
                        <img
                          className="shopee-avatar__img"
                          src={userInfo.userDto.avatar}
                          alt="img"
                        />
                      </div>
                    </a>
                    <div className="shopee-product-rating__main">
                      <a
                        className="shopee-product-rating__author-name"
                        href="/shop"
                      >
                        {userInfo.userDto.username}
                      </a>
                      <div className="shopee-product-rating__rating">
                        <div className="rating1">
                          <div className="shopee-rating-stars">
                            <div className="shopee-rating-stars__stars">
                              <div className="shopee-rating-stars__star-wrapper">
                                <div
                                  className="shopee-rating-stars__lit"
                                  style={{
                                    width: `${star >= 1 ? "100%" : "0"}`,
                                  }}
                                >
                                  <svg
                                    onClick={() => setStar(1)}
                                    enableBackground="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    className="shopee-svg-icon shopee-rating-stars__gold-star icon-rating-solid"
                                  >
                                    <polygon
                                      points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeMiterlimit="10"
                                    ></polygon>
                                  </svg>
                                </div>
                                <svg
                                  onClick={() => setStar(1)}
                                  enableBackground="new 0 0 15 15"
                                  viewBox="0 0 15 15"
                                  x="0"
                                  y="0"
                                  className="shopee-svg-icon shopee-rating-stars__dark-star icon-rating-solid"
                                >
                                  <polygon
                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                  ></polygon>
                                </svg>
                              </div>
                              <div className="shopee-rating-stars__star-wrapper">
                                <div
                                  className="shopee-rating-stars__lit"
                                  style={{
                                    width: `${star >= 2 ? "100%" : "0"}`,
                                  }}
                                >
                                  <svg
                                    onClick={() => setStar(2)}
                                    enableBackground="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    className="shopee-svg-icon shopee-rating-stars__gold-star icon-rating-solid"
                                  >
                                    <polygon
                                      points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeMiterlimit="10"
                                    ></polygon>
                                  </svg>
                                </div>
                                <svg
                                  onClick={() => setStar(2)}
                                  enableBackground="new 0 0 15 15"
                                  viewBox="0 0 15 15"
                                  x="0"
                                  y="0"
                                  className="shopee-svg-icon shopee-rating-stars__dark-star icon-rating-solid"
                                >
                                  <polygon
                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                  ></polygon>
                                </svg>
                              </div>
                              <div className="shopee-rating-stars__star-wrapper">
                                <div
                                  className="shopee-rating-stars__lit"
                                  style={{
                                    width: `${star >= 3 ? "100%" : "0"}`,
                                  }}
                                >
                                  <svg
                                    onClick={() => setStar(3)}
                                    enableBackground="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    className="shopee-svg-icon shopee-rating-stars__gold-star icon-rating-solid"
                                  >
                                    <polygon
                                      points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeMiterlimit="10"
                                    ></polygon>
                                  </svg>
                                </div>
                                <svg
                                  onClick={() => setStar(3)}
                                  enableBackground="new 0 0 15 15"
                                  viewBox="0 0 15 15"
                                  x="0"
                                  y="0"
                                  className="shopee-svg-icon shopee-rating-stars__dark-star icon-rating-solid"
                                >
                                  <polygon
                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                  ></polygon>
                                </svg>
                              </div>
                              <div className="shopee-rating-stars__star-wrapper">
                                <div
                                  className="shopee-rating-stars__lit"
                                  style={{
                                    width: `${star >= 4 ? "100%" : "0"}`,
                                  }}
                                >
                                  <svg
                                    onClick={() => setStar(4)}
                                    enableBackground="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    className="shopee-svg-icon shopee-rating-stars__gold-star icon-rating-solid"
                                  >
                                    <polygon
                                      points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeMiterlimit="10"
                                    ></polygon>
                                  </svg>
                                </div>
                                <svg
                                  onClick={() => setStar(4)}
                                  enableBackground="new 0 0 15 15"
                                  viewBox="0 0 15 15"
                                  x="0"
                                  y="0"
                                  className="shopee-svg-icon shopee-rating-stars__dark-star icon-rating-solid"
                                >
                                  <polygon
                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                  ></polygon>
                                </svg>
                              </div>
                              <div className="shopee-rating-stars__star-wrapper">
                                <div
                                  className="shopee-rating-stars__lit"
                                  style={{
                                    width: `${star >= 5 ? "100%" : "0"}`,
                                  }}
                                >
                                  <svg
                                    onClick={() => setStar(5)}
                                    enableBackground="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    className="shopee-svg-icon shopee-rating-stars__gold-star icon-rating-solid"
                                  >
                                    <polygon
                                      points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeMiterlimit="10"
                                    ></polygon>
                                  </svg>
                                </div>
                                <svg
                                  onClick={() => setStar(5)}
                                  enableBackground="new 0 0 15 15"
                                  viewBox="0 0 15 15"
                                  x="0"
                                  y="0"
                                  className="shopee-svg-icon shopee-rating-stars__dark-star icon-rating-solid"
                                >
                                  <polygon
                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                  ></polygon>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="shopee-product-rating__content">
                        <input
                          className="input_comment"
                          type="text"
                          placeholder="nhap vao danh gia cua ban"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <div
                          className="button_send"
                          onClick={() => postCommentHandle(productInfo)}
                        >
                          <i className="fas fa-share"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="product-ratings__list">
                <div className="shopee-product-comment-list">
                  {productInfo.commentList.map((item, index) => (
                    <div key={index} className="shopee-product-rating">
                      <a
                        className="shopee-product-rating__avatar"
                        href="/shop/235127802"
                      >
                        <div className="shopee-avatar">
                          <div className="shopee-avatar__placeholder">
                            <svg
                              enableBackground="new 0 0 15 15"
                              viewBox="0 0 15 15"
                              x="0"
                              y="0"
                              className="shopee-svg-icon icon-headshot"
                            >
                              <g>
                                <circle
                                  cx="7.5"
                                  cy="4.5"
                                  fill="none"
                                  r="3.8"
                                  strokeMiterlimit="10"
                                ></circle>
                                <path
                                  d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeMiterlimit="10"
                                ></path>
                              </g>
                            </svg>
                          </div>
                          <img
                            className="shopee-avatar__img"
                            src={item.userAvatar}
                            alt="avata"
                          />
                        </div>
                      </a>
                      <div className="shopee-product-rating__main">
                        <a
                          className="shopee-product-rating__author-name"
                          href="/shop/235127802"
                        >
                          {item.userName}
                        </a>
                        <div className="shopee-product-rating__rating">
                          <Rating item={item.rating}></Rating>
                        </div>
                        <div className="shopee-product-rating__content">
                          {item.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductScreen;
