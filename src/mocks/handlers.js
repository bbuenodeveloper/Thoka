import { http, HttpResponse } from 'msw';

let users = []; // "banco de dados" em memória
let checkouts = []; // "banco de dados" para checkout

export const handlers = [
  http.post('/api/signup', async ({ request }) => {
    const body = await request.json();
    const exists = users.find(u => u.email === body.email);

    if (exists) {
      return HttpResponse.json({ message: 'Email já cadastrado' }, { status: 400 });
    }

    const newUser = { id: users.length + 1, ...body };
    users.push(newUser);

    return HttpResponse.json(newUser, { status: 201 }); // Added 201 status for signup
  }),

  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();

    const user = users.find(u => u.email === email && u.password === password); // Assuming password is plain text for mock

    if (user) {
      // Exclude password from the returned user object for security
      const { password: userPassword, ...userWithoutPassword } = user;
      return HttpResponse.json(
        {
          user: userWithoutPassword,
          token: `mock-jwt-token-for-${user.id}`, // Generate a unique mock token
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: 'Credenciais inválidas' },
      { status: 401 }
    );
  }),

  http.post('/api/checkout', async ({ request }) => {
    const checkoutData = await request.json();
    
    // Payment is assumed successful due to prior validation
    const newCheckout = { id: checkouts.length + 1, ...checkoutData, status: 'approved' };
    checkouts.push(newCheckout);
    return HttpResponse.json({ message: 'Pagamento aprovado!' }, { status: 200 });
  }),

  http.get('/api/users', () => {
    return HttpResponse.json(users);
  }),

  http.get('/api/checkouts', () => {
    return HttpResponse.json(checkouts);
  }),
];
