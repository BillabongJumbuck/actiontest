const fs = require('fs');

async function runTests() {
    // 使用动态 import() 导入 node-fetch
    const fetch = await import('node-fetch').then(module => module.default);

    const testCases = JSON.parse(fs.readFileSync('test-cases.json', 'utf-8'));
    let allPassed = true;

    for (const testCase of testCases) {
        console.log(`Running test: ${testCase.name}...`);
        try {
            const response = await fetch(testCase.url, { method: testCase.method });
            const body = await response.json();

            // 简单的断言实现
            for (const assertion of testCase.assertions) {
                if (assertion.type === 'statusCode' && response.status !== assertion.expected) {
                    console.error(`  - Failed: Expected status ${assertion.expected}, but got ${response.status}`);
                    allPassed = false;
                }
                if (assertion.type === 'body.name' && body.name !== assertion.expected) {
                    console.error(`  - Failed: Expected body.name "${assertion.expected}", but got "${body.name}"`);
                    allPassed = false;
                }
            }

            if (allPassed) {
                console.log(`  - Passed`);
            }

        } catch (error) {
            console.error(`  - Failed: An error occurred`, error);
            allPassed = false;
        }
    }

    if (allPassed) {
        console.log("All tests passed!");
        process.exit(0); // 成功退出
    } else {
        console.error("Some tests failed!");
        process.exit(1); // 失败退出
    }
}

runTests();