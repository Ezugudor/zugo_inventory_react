import { White, Red } from "../../Utils/Buttons";
import styles from "./PreviewSale.module.css";
import "../Modals.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const PreviewSale = props => (
  <Modal show={props.showPreviewSales} click={props.togglePreviewSales}>
    <div class="modal_conddwtainer">
      <div class="modal_body full">
        <div class="card_main_header">
          <span class="tab_header">Trans ID: 5X254677 | Store: Oshodi-1</span>
          <ul class="card_tab_list">
            <li>
              <span
                class="mdi mdi-close close_modal tog_modal"
                onClick={props.togglePreviewSales}
              ></span>
            </li>
          </ul>
        </div>

        <div class="scroll_body">
          <div class="table-wrapper">
            <table class="fl-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price per Item</th>
                  <th>Total Amount</th>
                  <th>Discount</th>
                  <th>Cost price</th>
                  <th>Total Cost Price</th>
                  <th>Sells Person</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Dangote</td>
                  <td>30</td>
                  <td>N10,000</td>
                  <td>N300,000</td>
                  <td>10</td>
                  <td>N25,000</td>
                  <td>N28,000</td>
                  <td>Obinna</td>
                  <td>10/01/2020</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="modal_footer">
          <span
            class="primary_btn tog_modal"
            style={{ background: "var(--grey)", color: "var(--black)" }}
            onClick={props.togglePreviewSales}
          >
            Close
          </span>
        </div>
      </div>
    </div>
  </Modal>
);

PreviewSale.propTypes = {
  toggleDeleteBusiness: PropTypes.func.isRequired,
  showDeleteBusiness: PropTypes.bool.isRequired,
  businessToDelete: PropTypes.object.isRequired,
  deleteBusiness: PropTypes.func.isRequired
};
