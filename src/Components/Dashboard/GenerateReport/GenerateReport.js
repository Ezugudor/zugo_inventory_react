import { White, Red } from "../../Utils/Buttons";
import styles from "./GenerateReport.module.css";
import "../Modals.css";
import "./GenerateReportClassic.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const GenerateReport = props => (
  <Modal show={props.showGeneralReport} click={props.toggleGeneralReport}>
    <div class="modal_containesr3">
      <div class="modal_body half">
        <div class="card_main_header">
          <span class="tab_header">Generate Report</span>
          <ul class="card_tab_list">
            <li>
              <span class="mdi mdi-dots-vertical close_modal"></span>
              <ul class="card_list_menu">
                <li>
                  <span class="mdi mdi-delete-outline"></span> Delete Record
                </li>
                <li
                  class="tog_modal3"
                  onClick={e => props.toggleGeneralReport()}
                >
                  <span class="mdi mdi-close"></span> Close Window
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="scroll_body2">
          <div class="report_container">
            <div class="r_head">
              <div class="col-md-10">
                <span class="big_bold">
                  Alaba Store 1<br />
                  <span class="small_txt">(Emma Cements)</span>
                </span>
              </div>

              <div class="col-md-2 pull-right">
                <div
                  class="company_image"
                  style={{
                    backgroundImage: "url(/images/logo/icon.png)"
                  }}
                ></div>
              </div>

              <span class="page_excerpt" style={{ margin: "1em 0" }}>
                Report For: <span class="bold">25/02/2020</span>
              </span>
            </div>

            <div class="col-md-12">
              <div class="r_head">
                <span class="big_bold">Sales:</span>
                <div class="clearfix"></div>

                <div class="col-md-4">
                  <div class="col2">
                    <span class="bold">Total Sales</span>
                    <br />
                    <span>N350,000</span>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="col2">
                    <span class="bold">Cash</span>
                    <br />
                    <span>N250,000</span>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="col2">
                    <span class="bold">Credit</span>
                    <br />
                    <span>N150,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="r_head">
                <span class="big_bold">Sales Summary:</span>
                <div class="clearfix"></div>

                <div class="table-wrapper">
                  <table class="table-striped table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Amount</th>
                        <th>Customer</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dangote</td>
                        <td>200</td>
                        <td>N70,000</td>
                        <td>Emeka</td>
                        <td>Cash</td>
                      </tr>

                      <tr>
                        <td>Dangote</td>
                        <td>200</td>
                        <td>N70,000</td>
                        <td>Emeka</td>
                        <td>Cash</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="r_head">
                <span class="big_bold">Stock Summary:</span>
                <div class="clearfix"></div>

                <div class="table-wrapper">
                  <table class="table-striped table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Amount</th>
                        <th>Customer</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dangote</td>
                        <td>200</td>
                        <td>N70,000</td>
                        <td>Emeka</td>
                        <td>Cash</td>
                      </tr>

                      <tr>
                        <td>Dangote</td>
                        <td>200</td>
                        <td>N70,000</td>
                        <td>Emeka</td>
                        <td>Cash</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal_footer">
          <button
            class="primary_btn"
            onClick={e => window.print()}
            style={{ marginRight: "1em" }}
          >
            <span class="mdi mdi-printer"></span> Print report
          </button>
          <span
            class="primary_btn tog_modal3"
            onClick={e => props.toggleGeneralReport()}
          >
            Close
          </span>
        </div>
      </div>
    </div>
  </Modal>
);

GenerateReport.propTypes = {
  toggleDeleteBusiness: PropTypes.func.isRequired,
  showDeleteBusiness: PropTypes.bool.isRequired,
  businessToDelete: PropTypes.object.isRequired,
  deleteBusiness: PropTypes.func.isRequired
};
