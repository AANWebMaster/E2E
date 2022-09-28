npm install
npx playwright install
if($null -eq $env:TEST_FOLDER) {
    Write-Host "Launching all Playwright Tests contained within the testing repository"
    $TARGET_FOLDER = "./tests/"
} else {
    $TARGET_FOLDER = "./tests/$env:TEST_FOLDER/"
    Write-Host "Launching Playwright tests contained within $TARGET_FOLDER"
}
npx playwright test $TARGET_FOLDER