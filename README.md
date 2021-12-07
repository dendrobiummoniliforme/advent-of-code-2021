1. Visit: [ts-node](https://github.com/TypeStrong/ts-node).   
2. Run    

    ```
    # Locally in your project.
    npm install -D typescript
    npm install -D ts-node
    ```

3. (Optional) Add @types.

    ```
    # Depending on configuration, you may also need these
    npm install -D tslib @types/node
    ```

4. Make file 2021_day_1.ts.    
5. Run

    ```
    node -r ts-node/register 2021_day_1.ts
    ```

This will register ts-node [programmatically](https://github.com/TypeStrong/ts-node#programmatic) and run your program.
