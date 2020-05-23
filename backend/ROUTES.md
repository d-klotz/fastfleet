<p align="center">
</p>

<h1 align="center">Routes from FastFleet API</h1>

## No secure routes

**POST /login**

Body params *(Login session)*

```json
{
	"email": "admin@fastfleet.com",
	"password": "123456"
}
```

**GET /deliveryman/:id/deliveries**

Query params:

```json
end = true // will list all ended deliveries
// or empty to list all deliveries (ended or not)
```

**PUT /deliveryman/:id/deliveries**

Query params *(Finish delivery)*:

```json
deliveryId = 1
end_date = 2020-01-29T18:16:00.000Z
```

Multipart form *(Finish delivery)*:

```json
file = // upload file image
```

**PUT /deliveryman/:id/deliveries**

Body params *(Start delivery)*:

```json
{
	"start_date": "2020-01-31T18:00:00.000Z"
}
```

Query param *(Start delivery)*:

```json
deliveryId = 1
```

**POST /delivery/:id/problems**

Body params *(Register a problem)*

```json
{
	"description": "Destinatário ausente"
}
```

## Secure routes

// Upload file route
routes.post('/files', upload.single('file'), FileController.store);

// Admin user routes
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Recipients routes
routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

// Deliveryman routes
routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman', DeliverymanController.index);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

// Delivery routes
routes.post('/delivery', DeliveryController.store);
routes.get('/delivery', DeliveryController.index);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

// Delivery problems routes
routes.get('/delivery/problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.index);
routes.put('/delivery/problems/:id', DeliveryProblemController.update);
routes.delete('/delivery/problems/:id', DeliveryProblemController.delete);

// Cancel delivery based in a problem
routes.post('/problems/:id/cancel-delivery', DeliveryStatusController.store);

export default routes;
