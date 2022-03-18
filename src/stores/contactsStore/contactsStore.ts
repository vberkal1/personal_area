import { action, makeObservable, observable, runInAction } from "mobx";
import service from "./contactsStore.services";
import storageUtil from "../../utils/storageUtil";
import { AddContactParametrs, Contact } from "./contactsStore.models";
import { v4 as uuidv4 } from "uuid";

const initialStoreValues = {
  contacts: [],
  searchValue: "",
};

class ContactsStore {
  contacts: Array<Contact> = initialStoreValues.contacts;

  searchValue: string = initialStoreValues.searchValue;

  constructor() {
    makeObservable(this, {
      contacts: observable,
      searchValue: observable,
      getContacts: action.bound,
      deleteContact: action.bound,
      addContact: action.bound,
      editContact: action.bound,
      changeSearchValue: action.bound,
    });
  }

  changeSearchValue(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void {
    this.searchValue = e.target.value;
    this.getContacts();
  }

  async deleteContact(contactId: string): Promise<void> {
    try {
      const token = storageUtil.getAccessToken();
      if (token) {
        const requestContacts: Array<Contact> = this.contacts.filter(
          (contact) => contact.contactId !== contactId
        );
        const contacts: Array<Contact> = await service.editContacts(
          token,
          requestContacts
        );
        const filterContacts = this.filterContacts(contacts);
        runInAction(() => {
          this.contacts = filterContacts;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async editContact(
    requestParametrs: AddContactParametrs,
    contactId: string
  ): Promise<void> {
    const { name, number, url } = requestParametrs;
    const requestContacts: Array<Contact> = [...this.contacts];
    const index = requestContacts.findIndex(
      (contact) => contact.contactId === contactId
    );
    requestContacts[index] = { contactId: uuidv4(), name, number, url };

    try {
      const token = storageUtil.getAccessToken();
      if (token) {
        const contacts: Array<Contact> = await service.editContacts(
          token,
          requestContacts
        );
        const filterContacts = this.filterContacts(contacts);
        runInAction(() => {
          this.contacts = filterContacts;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addContact(requestParametrs: AddContactParametrs): Promise<void> {
    const { name, number, url } = requestParametrs;
    const requestContacts: Array<Contact> = [
      { contactId: uuidv4(), name, number, url },
      ...this.contacts,
    ];
    try {
      const token = storageUtil.getAccessToken();
      if (token) {
        const contacts: Array<Contact> = await service.editContacts(
          token,
          requestContacts
        );
        const filterContacts = this.filterContacts(contacts);
        runInAction(() => {
          this.contacts = filterContacts;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getContacts(): Promise<void> {
    try {
      const token = storageUtil.getAccessToken();
      if (token) {
        const contacts: Array<Contact> = await service.getContacts(token);
        const filterContacts = this.filterContacts(contacts);
        runInAction(() => {
          this.contacts = filterContacts;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  filterContacts(contacts: Array<Contact>): Array<Contact> {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }
}

export default new ContactsStore();
