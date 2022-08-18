/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import LayoutAdmin from "@/components/Layout/admin";
import styles from "./Invoice.module.scss";
import Link from "next/link";
import useInvoice from "@/hooks/use-invoice";
import { path } from "@/constants";
import stylesAdmin from "@/styles/admin/Admin.module.scss";
import { useRouter } from "next/router";
import { formatPrice } from "@/utils/formatNumber";
import { IIvoice } from "@/models/invoice";

type Props = {
  invoice: IIvoice[];
};

const DetailInvoice = (props: Props) => {
  const { detail, error } = useInvoice();
  const [invoice, setInvoice] = useState<IIvoice>();
  const [total, setTotal] = useState<number>();
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    if (!id) return;
    const get = async () => {
      const data: any = await detail(id);
      let totalPrice: any = 0;

      const cart = data.invoiceDetails;
      cart.forEach((element) => {
        totalPrice += element.total;
      });
      setTotal(totalPrice);
      setInvoice(data);
    };
    get();
  }, [id]);

  return (
    <div>
      <div className="">
        <div className="tw-flex tw-justify-between tw-items-center">
          <h4 className={stylesAdmin["title-admin"]}>List Invoice</h4>
          <div className="">
            <Link href={`${path.private.invoiceRoute}/edit/${id}`}>
              <Button.Fill className={""} content="Edit" />
            </Link>
            <div className="tw-inline-block">
              {invoice?.invoice.status === 0 ? (
                <button className={styles["order_item"]}>
                  <span
                    className={`${styles["order_status_pending-progress"]} ${styles["stt-custom"]}`}
                  >
                    Pending
                  </span>
                </button>
              ) : invoice?.invoice.status === 1 ? (
                <button className={styles["order_item"]}>
                  <span
                    className={`${styles["order_status_pending-shipping"]} ${styles["stt-custom"]}`}
                  >
                    Shipping
                  </span>
                </button>
              ) : invoice?.invoice.status === 2 ? (
                <button className={styles["order_item"]}>
                  <span
                    className={`${styles["order_status_delivered"]} ${styles["stt-custom"]}`}
                  >
                    Delivered
                  </span>
                </button>
              ) : invoice?.invoice.status === 3 ? (
                <button className={styles["order_item"]}>
                  <span
                    className={`${styles["order_status_cancelled"]} ${styles["stt-custom"]}`}
                  >
                    Cancel
                  </span>
                </button>
              ) : invoice?.invoice.status === 4 ? (
                <button className={styles["order_item"]}>
                  <span
                    className={`${styles["order_status_cancelled"]} ${styles["stt-custom"]}`}
                  >
                    Order canceled
                  </span>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <p></p>
        <div className="">
          <div className={styles["fullname"]}>
            Fullname:{" "}
            <span className="tw-font-bold">{invoice?.invoice.fullname}</span>
          </div>
        </div>
        <p></p>
        <div className={styles["invoice"]}>
          <div className={`${styles["tab1"]} tw-text-center`}>
            <div className="tw-pt-4 tw-flex-1 tw-items-center">
              <span className="tw-text-my-gray"> Order Id: &nbsp;</span>
              {invoice?.invoice._id}
            </div>
            <div className="tw-flex-1">
              <span className="tw-text-my-gray"> Phone:&nbsp;</span>
              {invoice?.invoice.phoneNumber}
            </div>
            <div className="tw-flex-1">
              <span className="tw-text-my-gray">Delivered on:&nbsp;</span>
              {invoice?.invoice.createdAt.split("", 10)}
            </div>
          </div>
          {invoice?.invoiceDetails?.map((item, index) => (
            <div key={index} className="">
              <div className={`${styles["tab-img"]} && ${"tw-flex tw-items-center tw-text-center"}`}>
                <div className="tw-flex tw-flex-1 tw-items-center tw-pl-3">
                  <div className="tw-mr-3">
                    <img
                      width={70}
                      className="tw-rounded-[var(--rounded-1)] tw-h-20 tw-object-cover"
                      src={item.img}
                      alt=""
                    />
                  </div>
                  <div className="tw-pt-5 !tw-text-left">
                    <h6>{item.name}</h6>
                  </div>
                </div>
                <div className="tw-flex-1">
                  <span className="tw-text-my-gray">Size: {item.size}</span>
                </div>
                <div className="tw-flex-1">
                  <span className="tw-text-my-gray">
                    {" "}
                    Price: &nbsp;
                    {item.salePrice
                      ? formatPrice(item.salePrice)
                      : formatPrice(item.regularPrice)}
                  </span>
                </div>
                <div className="tw-flex-1">
                  <span className="tw-text-my-gray">
                    Quantity: {item.quantity}
                  </span>
                </div>
                <div className="tw-flex-1">
                  <span className="tw-text-my-gray">Total: &nbsp;</span>
                  <span className="tw-text-red-500 tw-font-medium">
                    {formatPrice(item.total)}
                  </span>
                </div>
                {/* <div className="">
                  <Button.Transparent content={"Write A Review"} />
                </div> */}
              </div>
            </div>
          ))}
        </div>
        <div className="tw-flex tw-gap-6 tw-my-6">
          <div className={styles["tab2"]}>
            <span className="tw-block tw-font-medium tw-text-xl">
              Shipping Address
            </span>
            <span>{invoice?.invoice.address}</span>
          </div>
          <div className={styles["tab2"]}>
            <span className=" tw-font-medium  tw-text-xl">Total Summary</span>
            <div className="">
              <div className="tw-pt-4 tw-flex  tw-justify-between">
                <span className="tw-text-my-gray">Subtotal:</span>{" "}
                {formatPrice(total)}
              </div>
              <div className="tw-pt-4 tw-flex  tw-justify-between">
                <span className="tw-text-my-gray">Shipping fee:</span>{" "}
                {formatPrice(5)}
              </div>
            </div>
            <hr />
            <div className="tw-pt-4 tw-flex  tw-justify-between">
              <span className="tw-font-medium  tw-text-base tw-pb-4">
                Total
              </span>
              <span id="total_detail" className="tw-font-medium tw-text-xl">
                {formatPrice(total + 5)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
DetailInvoice.Layout = LayoutAdmin;

export default DetailInvoice;
