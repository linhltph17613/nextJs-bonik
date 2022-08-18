/* eslint-disable @next/next/no-img-element */
import { path } from '@/constants'
import React from 'react'
import CustomLink from "../customLink/index";

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <aside className="tw-shadow-md tw-z-20 tw-h-full tw-hidden tw-w-64 tw-overflow-y-auto tw-bg-white :tw-bg-gray-800 md:tw-block tw-flex-shrink-0">
      <div className="tw-px-3 tw-py-4 tw-text-gray-500 :tw-text-gray-400">
        <CustomLink href="/">
          <img
            className="tw-cursor-pointer"
            src="https://bonik-react.vercel.app/assets/images/logo.svg"
            alt=""
          />
        </CustomLink>
        <div className="tw-block tw-mt-8 tw-space-y-2">
          <div className="tw-px-2">
            <CustomLink href={path.private.rootRoute}>
              <a
                href=""
                className=" admin-nav__link tw-block tw-space-x-2 tw-w-full tw-p-2 tw-rounded hover:tw-bg-purple-100 "
              >
                <span className="  !tw-text-sm tw-font-semibold hover:tw-text-primary ">
                  <i className="bi bi-bar-chart-line-fill !tw-text-sm"></i>{" "}
                  Dashboard
                </span>
              </a>
            </CustomLink>
          </div>
          <div className="tw-px-2">
            <CustomLink href={path.private.categoriesRoute}>
              <a
                href=""
                className=" admin-nav__link tw-block tw-space-x-2 tw-w-full tw-p-2 tw-rounded hover:tw-bg-purple-100 "
              >
                <span className="!tw-text-sm tw-font-semibold hover:tw-text-primary">
                  <i className="bi bi-grid-fill !tw-text-sm"></i> Category
                </span>
              </a>
            </CustomLink>
          </div>
          <div className="tw-px-2">
            <CustomLink href={path.private.productsRoute}>
              <a
                href=""
                className=" admin-nav__link tw-block tw-space-x-2 tw-w-full tw-p-2 tw-rounded hover:tw-bg-purple-100 "
              >
                <span className="!tw-text-sm tw-font-semibold hover:tw-text-primary">
                  <i className="bi bi-box-fill !tw-text-sm"></i> Product
                </span>
              </a>
            </CustomLink>
          </div>
          <div className="tw-px-2">
            <CustomLink href={path.private.slidesRoute}>
              <a
                href=""
                className=" admin-nav__link tw-block tw-space-x-2 tw-w-full tw-p-2 tw-rounded hover:tw-bg-purple-100 "
              >
                <span className="!tw-text-sm tw-font-semibold hover:tw-text-primary">
                  <i className="bi bi-box-fill !tw-text-sm"></i> Slide
                </span>
              </a>
            </CustomLink>
          </div>
          <div className="tw-px-2">
            <CustomLink href={path.private.invoiceRoute}>
              <a
                href=""
                className=" admin-nav__link tw-block tw-space-x-2 tw-w-full tw-p-2 tw-rounded hover:tw-bg-purple-100 "
              >
                <span className="!tw-text-sm tw-font-semibold hover:tw-text-primary">
                  <i className="bi bi-grid-fill !tw-text-sm"></i> Invoice
                </span>
              </a>
            </CustomLink>
          </div>
          <div className="tw-px-2">
            <CustomLink href={path.private.UserRoute}>
              <a
                href=""
                className=" admin-nav__link tw-block tw-space-x-2 tw-w-full tw-p-2 tw-rounded hover:tw-bg-purple-100 "
              >
                <span className="!tw-text-sm tw-font-semibold hover:tw-text-primary">
                  <i className="bi bi-grid-fill !tw-text-sm"></i> Users
                </span>
              </a>
            </CustomLink>
          </div>
          <div className="tw-px-2">
            <CustomLink href={path.private.voucherRoute}>
              <a
                href=""
                className=" admin-nav__link tw-block tw-space-x-2 tw-w-full tw-p-2 tw-rounded hover:tw-bg-purple-100 "
              >
                <span className="!tw-text-sm tw-font-semibold hover:tw-text-primary">
                  <i className="bi bi-grid-fill !tw-text-sm"></i> Vouchers
                </span>
              </a>
            </CustomLink>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar