import { DatePicker, InboxPagination } from '../Utils';
import React from 'react';
export const Inbox = props => (
  <div className="inbox">
    <section className="inbox__header">
      <DatePicker />
      <InboxPagination />
    </section>
    <section className="inbox__body">
      <div className="inbox__controls">
        <button className="inbox__button inbox__button--active">
          <span className="inbox__icon inbox__icon--unread">100</span>
          Unread
        </button>
        <button className="inbox__button inbox__button">
          <span className="inbox__icon inbox__icon--revision">100</span>
          Revisions
        </button>
        <button className="inbox__button inbox__button">Processed</button>
      </div>
      <div className="inbox__content">
        <ul className="inbox__list">
          <li className="inbox__item">
            <a className="inbox__link">
              <span className="inbox__form-name">
                GTBusiness Account - Corporate
              </span>
              <span className="inbox__note">Signature is missing</span>
              <span className="inbox__time">16/10/2018</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
);
