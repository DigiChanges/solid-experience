# Wizard

The **Wizard **component is an aestetical component that allows you to show users from your app in which step is a modal or another specific component .

# Get started

Is so easy to use the wizard, you can do this in just some simple steps:

### Create the parent component and his management state.
1 - First of all the component should be inside of another element that should have an state that you allows you to control the step in which wizard is found.

2 - Now you can add two buttons that will change the value of the state we created in the previous step.

![](https://media.discordapp.net/attachments/1077350703443492987/1081604067559743558/image.png?width=1150&height=499)

### Add the wizard and the required props.
* import the wizard from src/features/wizard/wizard.tsx and add the component to the code.
* add the props stepsQuantity that should receive the quantity of steps you want to have and actual step that shouls receive the state we created before.

![](https://media.discordapp.net/attachments/1077350703443492987/1081607533824843806/image.png?width=1039&height=75)

This should be te output:

![](https://media.discordapp.net/attachments/1077350703443492987/1081608684167241789/image.png?width=918&height=268)

### Props
                    
| Name                       | Function                                                                                       | Required |
|----------------------------|------------------------------------------------------------------------------------------------|----------|
| stepsQuantity              | Defines total quantity of steps inside wizard coponent.                                        | ✅        |
| actualStep                 | Defines actual Step.                                                                           | ✅        |
| lineStartColor             | Change line between numbers background color when actualStep value is smaller than it's index. | ❌        |
| lineEndColor               | Change line between numbers background color when actualStep value is bigger than it's index.  | ❌        |
| lineHeight                 | Change the line between numbers container height.                                              | ❌        |
| numbersHeight              | Change the numbers container height.                                                           | ❌        |
| numbersWidth               | Change the numbers container width.                                                            | ❌        |
| numbersContainerStartColor | Change the background numbers color when actualStep value is smaller than it's index.          | ❌        |
| numbersContainerEndColor   | Change the background numbers color when actualStep value is bigger than it's index.           | ❌        |
| numberStartColor           | Change the numbers color when actualStep value is smaller than it's index.                     | ❌        |
| numberEndColor             | Change the numbers color when actualStep value is bigger than it's index.                      | ❌        |
| effectTotalTime            | Controls the time of next/previous step animation.                                             | ❌        |

