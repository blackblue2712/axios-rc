### RUN
- npm i
- npm run dev

### REQUEST
- Before all, you need to copy your cookie and update in `/pkg/helper.js`

    ![IMG](https://f5-zpcloud.zdn.vn/1447589949035534044/ea3bf4aa0d2dce73973c.jpg)
    
- `GET /?email=<encodeURIComponent(your_email)>`: Create contact => list => update list add contact => instant campaign. 

    - You must change ```document_id``` to one of **YOUR DOCUMENTS**

        ![IMG](https://f6-zpcloud.zdn.vn/4531526504838092789/d1f1cfef1a68d9368079.jpg)

    - You must change ```subscriptions``` & ```subscriptions_ids``` to **YOUR DEFAULT SUBSCRIPTION**

        ![IMG](https://f7-zpcloud.zdn.vn/8551257000340339811/1646d85f1ed8dd8684c9.jpg)

- `GET /sendTest`: instant campaign.
    - You must change ```list_id``` to one of **YOUR LIST ID**

        ![IMG](https://f6-zpcloud.zdn.vn/6384463948848176456/b8c20f8cc00b03555a1a.jpg)