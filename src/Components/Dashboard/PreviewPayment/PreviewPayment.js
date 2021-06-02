import { White, Red } from "../../Utils/Buttons";
import styles from "./PreviewPayment.module.css";
import "../Modals.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const PreviewPayment = props => (
  <Modal show={props.showPreviewPayment} click={props.togglePreviewPayment}>
    <div class="modal_contdsainer">
      <div class="modal_body full">
        <div class="card_main_header">
          <span class="tab_header">Customer: Ifeanyi | Amount: N200,000</span>
          <ul class="card_tab_list">
            <li>
              <span
                class="mdi mdi-close close_modal tog_modal"
                onClick={props.togglePreviewPayment}
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
                  <th>customer</th>
                  <th>is-outlet</th>
                  <th>outlet</th>
                  <th>Amount</th>
                  <th>Trans ID</th>
                  <th>Payment type</th>
                  <th>Added by</th>
                  <th>Date paid</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ifeanyi</td>
                  <td>-</td>
                  <td>-</td>
                  <td>N10,000</td>
                  <td>N15,000</td>
                  <td>36100</td>
                  <td>Cash</td>
                  <td>Nelson</td>
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
            onClick={props.togglePreviewPayment}
          >
            Close
          </span>
        </div>
      </div>
    </div>
  </Modal>
);

PreviewPayment.propTypes = {
  toggleDeleteBusiness: PropTypes.func.isRequired,
  showDeleteBusiness: PropTypes.bool.isRequired,
  businessToDelete: PropTypes.object.isRequired,
  deleteBusiness: PropTypes.func.isRequired
};
