/* eslint-disable @next/next/no-img-element */
import { filter } from "@/api/product";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { path } from "@/constants";
import { addItemToCart } from "@/features/cart/cart.slice";
import useProduct from "@/hooks/use-product";
import { IProduct } from "@/models/product";
import { formatPercent, formatPrice } from "@/utils/formatNumber";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "./TopListProduct.module.scss";

type Props = {
};

const TopListProduct = () => {
  const { detail } = useProduct()
  const dispatch = useDispatch();
  const [listTop, setListTop] = useState();
  useEffect(() => {
    const get = async () => {
      const data: any = await filter();
      setListTop(data);
    };
    get();
  }, []);

  const btnQuickAddToCart = async (id) => {
    const data: any = await detail(id)
    const itemQuickAddToCart = {
      idInCart: data._id + '_' + data.size,
      idPro: data._id,
      size: data.size[0],
      img: data.img,
      quantity: 1,
      name: data.name,
      desc: data.desc,
      regularPrice: data.regularPrice * 1,
      salePrice: data.salePrice * 1,
      categoryProduct: data.product,
      total: (data.salePrice) ? data.salePrice * 1 : data.regularPrice * 1
    }
    dispatch(addItemToCart(itemQuickAddToCart));
    toast.success("Add to cart successfully!", {
      position: 'top-center'
    })
  }
  if(!listTop) return <>Loading</>
  return (
    <>
      {listTop?.map((item, index) => (
        <div key={index} className={styles["shop-product__item"]}>
          <div className={styles["shop-product__item-img"]}>
            <span
              className={`${styles["shop-product__item-float"]} ${styles["shop-product__item-float--tag-sale"]}`}
            >
              {item.salePrice ? (
                <span className="product-tag product-tag--sale">
                  {formatPercent(item.salePrice, item.regularPrice)}
                </span>
              ) : (
                ""
              )}
            </span>
            <button
              className={`${styles["shop-product__item-float"]} ${styles["shop-product__item-float--action"]}`}
            >
              <Icon.HeartFill className={""} />
            </button>
            <Link href={`${path.public.productRoute}/${item._id}`}>
              <img src={item.img} alt="" />
            </Link>
          </div>
          <div className={styles["shop-product__item-text"]}>
            <h3>
              <Link href={`${path.public.productRoute}/${item._id}`}>
                <a href="" className={styles["shop-product__item-title"]}>
                  {item.name}
                </a>
              </Link>
            </h3>
            <div className={styles["shop-product__item-row"]}>
              <span className={styles["shop-product-star"]}>
                <Icon.Star className={""} />
                <Icon.Star className={""} />
                <Icon.Star className={""} />
                <Icon.Star className={""} />
                <Icon.Star className={""} />
              </span>
              <div className={styles["shop-product__item-variation"]}>
                {item.size.length > 3 ? (
                  <div>
                    <span
                      className={styles["shop-product-variation__item"]}
                    >
                      {item.size[0]}
                    </span>
                    <span
                      className={styles["shop-product-variation__item"]}
                    >
                      {item.size[1]}
                    </span>
                    <span
                      className={styles["shop-product-variation__item"]}
                    >
                      {item.size[2]}
                    </span>
                    <span>...</span>
                  </div>
                ) : (
                  item.size.map((sizeItem) => (
                    <span key={index}
                      className={styles["shop-product-variation__item"]}
                    >
                      {sizeItem}
                    </span>
                  ))
                )}
              </div>
            </div>
            <div className={styles["shop-product__item-row"]}>
              <div className="">
                <span
                  className={`${styles["shop-product-price"]} ${styles["shop-product-price--sale"]}`}
                >
                  {item.salePrice
                    ? formatPrice(item.salePrice)
                    : formatPrice(item.regularPrice)}
                </span>
                <span
                  className={`${styles["shop-product-price"]} ${styles["shop-product-price--regular"]}`}
                >
                  {item.salePrice ? formatPrice(item.regularPrice) : ""}
                </span>
              </div>
              <Button.Transparent onClick={() => btnQuickAddToCart(item._id)}
                className="!tw-py-[1px] !tw-px-1 !tw-min-h-0 !tw-h-[30px]"
                content={<Icon.PlusRegular className="tw-text-[21px]" />}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopListProduct;
