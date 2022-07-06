const axios = require("axios");
const { headers } = require("../pkg/helper");
const uuid = require("uuid");

module.exports = {
  createContact: async (email) => {
    console.log("createContact :: with email", email);
    try {
      const res = await axios.post(
        "https://realcampaign.com/angular-contact-index-service/contacts",
        {
          first_name: "nghia-" + uuid.v1(),
          middle_name: "",
          last_name: "",
          suffix: "",
          gender: "",
          channels: [
            {
              primary: true,
              type: "email",
              value: email,
              _type: "Contacts::EmailAddress",
            },
          ],
          addresses: [],
          custom_objects: [],
        },
        {
          headers: headers,
        }
      );

      return res.data;
    } catch (error) {
      console.log(error.response.data.errors);
      return false;
    }
  },
  createList: async () => {
    console.log("createList ::");
    try {
      const res = await axios.post(
        "https://realcampaign.com/angular-list-service/lists",
        {
          data: [
            {
              type: "lists",
              attributes: {
                name: `list-name-${uuid.v1()}`,
                description: "aaa",
                css_class: "fa-file-text-o",
                definition: [],
                campaign_events: [],
                on_reporting: false,
                ref_group_ids: [],
                subscriptions: { ids: [""] },
                subscription_ids: [""],
                target: "",
                ui_definition: "empty",
                join: false,
                visible: true,
                removable: true,
                system_default: false,
                type: "Lists::List",
              },
            },
          ],
        },
        {
          headers: headers,
        }
      );

      return res.data.data[0];

      // {"data":[{"type":"lists","id":"0793042437894313100","attributes":{"type":"Lists::List","target":"contact","name":"list-aaa","description":"aaa","group_size":0,"total_contacts":0,"subscribed":0,"mailable":0,"removable":true,"visible":true,"css_class":"fa-file-text-o","ui_definition":"","subscription":{"id":""},"subscriptions":{"ids":[""]},"ref_groups":null,"ref_group_ids":[""],"created_at":"2022-07-05T13:20:15.424906276Z","updated_at":"2022-07-05T13:20:15.424906276Z","created_by":"788632041196362917","update_by":"788632041196362917","system_default":false,"definition":[],"test_list":false}}],"meta":{"correlation_id":"3514e120-fc65-11ec-a3d9-7fb7c16c3037"}}
    } catch (error) {
      console.log(error.response.data.errors);
      return false;
    }
  },

  updateList: async (list, contactIds) => {
    console.log("updateList ::", list.id, contactIds);
    try {
      const res = await axios.put(
        `https://realcampaign.com/angular-list-service/lists/${list.id}`,
        {
          name: list.name,
          description: list.description,
          css_class: "fa-file-text-o",
          definition: [
            {
              excludeContactIds: [],
              includeContactIds: [],
              selectionCoverage: "all",
              selectionType: "all",
              listId: list.id,
            },
            {
              selectionType: "",
              includeContactIds: contactIds,
              excludeContactIds: [],
              selectionCoverage: "include",
              listId: list.id,
            },
          ],
          campaign_events: [],
          on_reporting: false,
          ref_group_ids: [],
          subscriptions: { ids: [""] },
          subscription_ids: [""],
          target: "",
          join: false,
          visible: true,
          removable: true,
          system_default: false,
          type: "Lists::List",
        },
        {
          headers: headers,
        }
      );

      return true;

      //   {"id":"0793042437894313100","type":"Lists::List","target":"contact","name":"list-aaa","group_size":0,"description":"aaa","removable":true,"visible":true,"css_class":"fa-file-text-o","ui_definition":"","subscription":{"id":""},"ref_groups":null,"ref_group_ids":[""],"created_at":"2022-07-05T13:20:15.424Z","updated_at":"2022-07-05T13:26:10.942486552Z","created_by":"788632041196362917","test_list":false,"system_default":false,"updated_by":"788632041196362917","definition":[{"excludeContactIds":[],"includeContactIds":[],"listId":"0793042437894313100","selectionCoverage":"all","selectionType":"all","totalContactsExcluded":0,"totalContactsSelected":0,"selected":false},{"excludeContactIds":[],"includeContactIds":["0793006137103357055"],"listId":"0683552940937449576","selectionCoverage":"include","selectionType":"","totalContactsExcluded":0,"totalContactsSelected":0,"selected":false}]}
    } catch (error) {
      console.log(error.response.data.errors);
      return false;
    }
  },

  publishEmail: async (listId) => {
    console.log("publish email ::", listId);
    try {
      const res = await axios.post(
        `https://realcampaign.com/angular-campaign-engine/instant_campaigns`,
        {
          data: {
            type: "instant_campaigns",
            attributes: {
              campaign_type: "email",
              list_id: listId,
              document_id: "0790094333041709683",
              prefix_name: uuid.v1(),
            },
          },
        },
        {
          headers: headers,
        }
      );


      return res.data

      //   {"id":"0793042437894313100","type":"Lists::List","target":"contact","name":"list-aaa","group_size":0,"description":"aaa","removable":true,"visible":true,"css_class":"fa-file-text-o","ui_definition":"","subscription":{"id":""},"ref_groups":null,"ref_group_ids":[""],"created_at":"2022-07-05T13:20:15.424Z","updated_at":"2022-07-05T13:26:10.942486552Z","created_by":"788632041196362917","test_list":false,"system_default":false,"updated_by":"788632041196362917","definition":[{"excludeContactIds":[],"includeContactIds":[],"listId":"0793042437894313100","selectionCoverage":"all","selectionType":"all","totalContactsExcluded":0,"totalContactsSelected":0,"selected":false},{"excludeContactIds":[],"includeContactIds":["0793006137103357055"],"listId":"0683552940937449576","selectionCoverage":"include","selectionType":"","totalContactsExcluded":0,"totalContactsSelected":0,"selected":false}]}
    } catch (error) {
        console.log("error occur when sent mail", error)
    //   console.log(error.response.data.errors);
      return false;
    }
  },
};
