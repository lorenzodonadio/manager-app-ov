# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

### Update supabase Types:

`npx supabase login`
`npx supabase gen types typescript --project-id blbosiccwkpntqobciwj > src/lib/types/SupabaseDefinition.d.ts`

### Color palette

primary blue (Panthone 298C): `#44b8f3`  
primary green (Panthone 360C) : `#6cc351`  
secondaty blue (Panthone 302C) : `#003c5e`
white: `#eeedee`

# FEATURES:

### Record Sales:

- **QR Scanning**: Facilitates the scanning of QR codes.
- **Water-Related Questions**: Ability to prompt and answer water-related questions.
- **Entrepreneur-Related Questions**: Functionality to manage inquiries related to local entrepreneurs.

### Authentication (Auth):

- **Supabase Integration**: Utilizes Supabase for authentication.
- **Invitation-Only Login**: Managers are handpicked by the Openversum core team, who can invite entrepreneurs. Once invited, they can log in.
- **Profile Management**: A record in `profiles` is created for newly signed-in users, who must complete it during their first login.

### Inventory Management:

- **Supply Distribution**: Managers can send supplies to entrepreneurs.
- **Supply Check Schedule**: A scheduled supply check occurs 30 days after sending supplies.

### Clients Management:

- **Client Records**: Users can record clients and link them to a sale.
- **Potential Clients**: Includes the ability to record potential clients with a `record interaction` feature to keep track of all interactions.

### Location Management:

- **Geolocation**: Mandatory use of geolocation to track the location of filter sales.
- **Mapping**: Maps are utilized to show areas and sales locations.
- **Location Assignment**: Entrepreneurs are assigned to a location, defined by a manager during the invitation process.

## Upcoming Features:

### Profile Management:

- **Add Profile Picture**: Allow users to personalize profiles with a profile picture.

### Inventory Management:

- **Adjust and Return Inventory**: Introduce functionality to modify and return inventory items.
- **Cartridge Items**: Add detailed information about cartridge items, including price and combined inventory details.
- **Perform Check Functionality**: Currently scheduled but needs implementation for actual execution.
- **Transaction Supply History**: Display historical transactions for both managers and entrepreneurs.
- **Request Inventory**: Enable entrepreneurs to request inventory as needed.

### Sales Management:

- **Online Payment Integration**: Connect with a payment service for entrepreneurs to pay for their supplies.
- **In-Progress Sale Completion**: Add the ability to complete an ongoing sale.

### discount Scheme:

- **Initial Implementation**: Implement a discount scheme showing potential discountes to entrepreneurs and managers.
- **Goal Achievement Tracking**: Display whether goals were met and entitlement to discountes.
- **discount Guidance**: Provide tips to entrepreneurs on how to reach discount targets.
- **Easy discount Payment**: Possibly integrate online banking for convenient discount payouts.

### Notifications:

- **Inventory & discount Notifications**: Notify users about received inventory, upcoming inventory checks, and discount statuses.
- **In-App & Push Notifications**: Start with in-app notifications with plans to add push notifications.

### Entrepreneur Network:

- **Area Grouping**: Group entrepreneurs by areas and facilitate interaction.
- **Integration Options**: Consider integrating platforms like WhatsApp for automatic group creation and communication.

### Client Interaction:

- **Client History**: View all interactions with a given client.
- **Product Check Reminders**: Remind users to verify if the filter is working correctly after some time.

## Extra Potential Features:

- **Electronic invoices for entrepreneurs** : standardize invoices and send them via email too

### Analytics and Reporting:

- **Sales Analytics**: Visualize sales data to help entrepreneurs and managers understand trends and performance.
- **Inventory Analytics**: Provide insights into inventory levels, usage patterns, and reordering needs.
- **Client Engagement Analytics**: Track client interactions and engagements for better customer relationship management.

### Education and Training:

- **Training Modules**: Offer online training modules for entrepreneurs to learn about water safety, filter technology, and business management.
- **Educational Content for End-Users**: Create content to educate end-users about water hygiene, filter usage, and maintenance.

### Quality Control:

- **Quality Assurance Checks**: Implement a system for quality checks on the filters, including user feedback and periodic inspections.
- **Service Scheduling**: Automate scheduling for filter maintenance or replacement, based on usage or time.

### Community Engagement:

- **Community Forum**: A platform for entrepreneurs, managers, and clients to share knowledge, ask questions, and engage in discussions.
- **Social Media Integration**: Enable sharing of success stories, testimonials, or educational content on social media platforms.
