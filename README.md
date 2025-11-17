# Laravel Inertia Project

This is a Laravel project integrated with Inertia.js and React.

## Installation

Follow these steps to set up the project locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/laravel-inertia.git
    cd laravel-inertia
    ```

2.  **Install PHP Dependencies:**

    ```bash
    composer install
    ```

3.  **Install JavaScript Dependencies:**

    ```bash
    npm install
    # OR
    yarn install
    ```

4.  **Environment Setup:**

    Copy the `.env.example` file to `.env` and configure your database and other environment variables.

    ```bash
    cp .env.example .env
    ```

5.  **Generate Application Key:**

    ```bash
    php artisan key:generate
    ```

6.  **Database Migrations:**

    Run the database migrations to set up your database schema.

    ```bash
    php artisan migrate
    ```

    If you are using PostgreSQL, ensure you have the `php-pgsql` extension installed. On Arch-based systems, you can install it using `paru` or `yay`:

    ```bash
    paru -S php-pgsql
    # OR
    yay -S php-pgsql
    ```

    If you encounter issues, verify your `php.ini` file (typically located at `/etc/php/php.ini`) and ensure the `extension=pgsql` line is uncommented.

7.  **Build Assets:**

    Compile your frontend assets.

    ```bash
    npm run dev
    # OR for production
    # npm run build
    ```

8.  **Serve the Application:**

    Start the Laravel development server.

    ```bash
    php artisan serve
    ```

    You can now access the application at `http://127.0.0.1:8000` (or the address specified in your `.env` file).