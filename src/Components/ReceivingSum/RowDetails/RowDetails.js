import { White, Red } from "../../Utils/Buttons";
import { FileUpload, PreviewImage } from "../../Utils";
import styles from "./RowDetails.module.css";
import "./RowDetailsClassic.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const RowDetails = props => (
  <Modal show={props.showRowDetails} click={props.toggleRowDetails}>
    <div class="modal_body half">
      <div class="card_main_header">
        <div class="company_header_info">
          {console.log("logging current entity", props.currentEntity)
          /* <div
              class="company_image"
              style={{
                "background-image": "url(assets/images/logo/icon.png)"
              }}
            ></div> */
          }
          <div className={styles.HeaderInfo}>
            <span className={styles.HeaderInfoItemCont}>
              <span className={styles.hLabel}>SKU Code:</span>
              <span className={`${styles.hValue} ${styles.em}`}>
                {props.currentEntity.supply_code}
              </span>
            </span>
            <br />
            <span className={styles.HeaderInfoItemCont}>
              <span className={styles.hLabel}>Item:</span>
              <span className={`${styles.hValue} ${styles.emp}`}>
                {props.currentEntity.product_name}
              </span>
            </span>
            <span className={styles.HeaderInfoItemCont}>
              <span className={styles.hLabel}>Status:</span>
              {props.currentEntity.used === "1" ? (
                <span className={`${styles.hValue} ${styles.danger}`}>
                  used
                </span>
              ) : (
                <span className={`${styles.hValue} ${styles.success}`}>
                  available
                </span>
              )}
            </span>
            <span className={styles.HeaderInfoItemCont}>
              <span className={styles.hLabel}>Date Used:</span>
              <span className={`${styles.hValue} ${styles.emp2}`}>
                {props.currentEntity.date_used}
              </span>
            </span>
          </div>
        </div>
        <ul class="card_tab_list">
          <li>
            <span class="mdi mdi-dots-vertical close_modal"></span>
            <ul class="card_list_menu">
              <li>
                <span class="mdi mdi-delete-outline"></span> Delete Record
              </li>
              <li class="tog_modal">
                <span class="mdi mdi-close"></span> Close Window
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="scroll_body2">
        <div className={`col-md-6 ${styles.Col}`}>
          <div className={styles.InfoItemCont}>
            <span className={styles.Label}>Supplied To:</span>
            <br />
            <span className={styles.Value}>
              {props.currentEntity.is_outlet === "1"
                ? props.currentEntity.outlet
                : `${props.currentEntity.customer_firstname} ${props.currentEntity.customer_lastname}`}
            </span>
            <div class="clearfix"></div>
          </div>
        </div>

        <div className={`col-md-6 ${styles.Col}`}>
          <div className={styles.InfoItemCont}>
            <span className={styles.Label}>Mode:</span>
            <br />
            <span className={styles.Value}>{props.currentEntity.mode}</span>
            <div class="clearfix"></div>
          </div>
        </div>

        <div className={`col-md-6 ${styles.Col}`}>
          <div className={styles.InfoItemCont}>
            <span className={styles.Label}>Driver :</span>
            <br />
            <span className={styles.Value}>
              {props.currentEntity.driver_firstname}{" "}
            </span>
            <div class="clearfix"></div>
          </div>
        </div>

        <div className={`col-md-6 ${styles.Col}`}>
          <div className={styles.InfoItemCont}>
            <span className={styles.Label}>Driver Phone :</span>
            <br />
            <span className={styles.Value}>
              {props.currentEntity.driver_phone}
            </span>
            <div class="clearfix"></div>
          </div>
        </div>

        <div className={`col-md-6 ${styles.Col}`}>
          <div className={styles.InfoItemCont}>
            <span className={styles.Label}>Truck ID :</span>
            <br />
            <span className={styles.Value}>{props.currentEntity.truck_id}</span>
            <div class="clearfix"></div>
          </div>
        </div>

        <div className={`col-md-6 ${styles.Col}`}>
          <div className={styles.InfoItemCont}>
            <span className={styles.Label}>Size:</span>
            <br />
            <span className={styles.Value}>{props.currentEntity.size}</span>
            <div class="clearfix"></div>
          </div>
        </div>
        <div className={`col-md-6 ${styles.Col}`}>
          <div className={styles.InfoItemCont}>
            <span className={styles.Label}>Source:</span>
            <br />
            <span className={styles.Value}>{props.currentEntity.source}</span>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>

      <div class="modal_footer">
        <div className={styles.controls}>
          <White click={props.toggleRowDetails}>Close</White>
        </div>
      </div>
    </div>
  </Modal>
);

RowDetails.propTypes = {
  setNewBusinessDetail: PropTypes.func.isRequired,
  toggleCreateBusiness: PropTypes.func.isRequired,
  showCreateBusiness: PropTypes.bool.isRequired,
  createBusiness: PropTypes.func.isRequired,
  newBusiness: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired
};
