const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn');
const imageContainer = document.getElementById('image-container');
const restartButton = document.getElementById('restart-btn');

let currentNode;

const startGame = () => {
    restartButton.classList.remove('hide');
    startButton.classList.add('hide');
    imageContainer.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentNode = answerTree;
    setNextQuestion();
}

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    setNextQuestion();
})
restartButton.addEventListener('click', startGame)

const resetState = () => {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild)
    }
}

const setNextQuestion = () => {
    questionElement.innerText = currentNode.tagNode;
    resetState();

    if (currentNode?.children) {
        if (!currentNode?.children[0]?.children) {
            questionElement.innerText = currentNode.children[0].tagNode.tagNode || currentNode.children[0].tagNode;
            // высрать пикчу
            if (currentNode.children[0]?.src || currentNode.children[0]?.tagNode?.src) {
                if (currentNode.children[0]?.tagNode?.src) currentNode.children[0].src = currentNode.children[0]?.tagNode?.src
                const image = document.createElement('img');
                image.src = currentNode.children[0].src;
                image.classList.add('image');
                imageContainer.classList.remove('hide');
                imageContainer.appendChild(image);
            }
            return;
        }
    }

    if (currentNode.yesNoQuestion) {

        const buttonYes = document.createElement('button');
        buttonYes.innerText = 'Да';
        buttonYes.classList.add('btn-yes');
        buttonYes.addEventListener('click', selectAnswer);

        const buttonNo = document.createElement('button');
        buttonNo.innerText = 'Нет';
        buttonNo.classList.add('btn-no');
        buttonNo.addEventListener('click', selectAnswer);

        answerButtonsElement.appendChild(buttonYes);
        answerButtonsElement.appendChild(buttonNo);

    } else {

        currentNode.children.forEach(element => {
            const button = document.createElement('button');
            button.innerText = element.tagNode;
            button.classList.add('btn');
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });

    }
}

const selectAnswer = e => {
    const selectedButton = e.target;
    if (selectedButton.classList.contains('btn-no')) {
        currentNode = { childrenDesc: currentNode.childrenDesc, tagNode: currentNode.tagNode, children: currentNode.negativeChildren }
    } else if (selectedButton.classList.contains('btn-yes')) {
        currentNode = { childrenDesc: currentNode.childrenDesc, tagNode: currentNode.tagNode, children: currentNode.positiveChildren }
    } else {
        currentNode = currentNode.children.find(item => item.tagNode === selectedButton.innerText);
    }
    if (!currentNode?.yesNoQuestion) {
        if (currentNode.children[0]?.yesNoQuestion) currentNode = currentNode.children[0]
    }
    currentNode.tagNode = currentNode.childrenDesc || currentNode.tagNode;
    nextButton.dispatchEvent(new Event('click'));
}

const defaultChoice = { tagNode: 'Можем предложить зеленый чай)', src: 'https://dachatea.ru/system/uploads/blog/file/81/1.jpg' };
const answerTree = {
    tagNode: 'Любите китайскую кухню?',
    yesNoQuestion: true,
    childrenDesc: 'Выберите основной продукт вашего блюда',
    positiveChildren: [
        {
            tagNode: 'Мяcо',
            yesNoQuestion: false,
            children: [
                {
                    tagNode: 'Курица',
                    childrenDesc: 'Выберите тип приготовления',
                    children: [
                        {
                            tagNode: 'Жареное',
                            children: [
                                {
                                    tagNode: 'Острое',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        {
                                            tagNode: 'Аллергия на кунжут',
                                            yesNoQuestion: true,
                                            positiveChildren: [
                                                defaultChoice
                                            ],
                                            negativeChildren: [
                                                {
                                                    tagNode: 'Пряный цыпленок',
                                                    src: 'http://prochinese.ru/wp-content/uploads/2018/06/34.jpg'
                                                }
                                            ]
                                        }
                                    ],
                                    negativeChildren: [
                                        defaultChoice
                                    ]
                                }
                            ]
                        },
                        {
                            tagNode: 'Вареное',
                            children: [
                                {
                                    tagNode: 'Соленое',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        {
                                            tagNode: 'Аллергия на имбирь',
                                            yesNoQuestion: true,
                                            positiveChildren: [
                                                defaultChoice
                                            ],
                                            negativeChildren: [
                                                {
                                                    tagNode: 'Белая курица, порезанная на кусочки',
                                                    src: 'http://prochinese.ru/wp-content/uploads/2018/06/12.jpg'
                                                }
                                            ]
                                        }
                                    ],
                                    negativeChildren: [
                                        defaultChoice
                                    ]
                                }
                            ]
                        },
                        {
                            tagNode: 'Ничего из вышеперечисленного',
                            children: [
                                {
                                    tagNode: defaultChoice
                                }
                            ]
                        }
                    ]
                },
                {
                    tagNode: 'Утка',
                    childrenDesc: 'Выберите тип приготовления',
                    children: [
                        {
                            tagNode: 'Запеченное',
                            yesNoQuestion: true,
                            positiveChildren: [
                                {
                                    tagNode: 'Сладкое',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        {
                                            tagNode: 'Аллергия на сою',
                                            yesNoQuestion: true,
                                            positiveChildren: [
                                                {
                                                    tagNode: defaultChoice
                                                }
                                            ],
                                            negativeChildren: [
                                                {
                                                    tagNode: 'Аллергия на мед',
                                                    yesNoQuestion: true,
                                                    positiveChildren: [
                                                        {
                                                            tagNode: defaultChoice
                                                        }
                                                    ],
                                                    negativeChildren: [
                                                        {
                                                            tagNode: 'Утка по-пекински',
                                                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/banket_3-копия.jpg'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    negativeChildren: [
                                        defaultChoice
                                    ]
                                }
                            ],
                            negativeChildren: [
                                {
                                    tagNode: defaultChoice
                                }
                            ]
                        }
                    ]
                },
                {
                    tagNode: 'Баранина',
                    childrenDesc: 'Выберите тип приготовления',
                    children: [
                        {
                            tagNode: 'Вареное',
                            children: [
                                {
                                    tagNode: 'Пряное',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        {
                                            tagNode: 'Суп из ягненка с питой',
                                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/21.jpg'
                                        }
                                    ],
                                    negativeChildren: [
                                        defaultChoice
                                    ]
                                }
                            ]
                        },
                        {
                            tagNode: 'Жареное',
                            children: [
                                {
                                    tagNode: 'Аллергия на сою',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        defaultChoice
                                    ],
                                    negativeChildren: [
                                        {
                                            tagNode: 'Жирное',
                                            yesNoQuestion: true,
                                            positiveChildren: [
                                                {
                                                    tagNode: 'Целиком зажаренный барашек',
                                                    src: 'http://prochinese.ru/wp-content/uploads/2018/06/24.jpg'
                                                }
                                            ],
                                            negativeChildren: [
                                                {
                                                    tagNode: 'Обжаренные кусочки теста с бараниной',
                                                    src: 'http://prochinese.ru/wp-content/uploads/2018/06/25.jpg'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagNode: 'Запеченное',
                            children: [
                                {
                                    tagNode: 'Аллергия на сладкий перец',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        defaultChoice
                                    ],
                                    negativeChildren: [
                                        {
                                            tagNode: 'Баранина Хэси',
                                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/26.jpg'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tagNode: 'Говядина',
                    childrenDesc: 'Выберите тип приготовления',
                    children: [
                        {
                            tagNode: 'На пару',
                            children: [
                                {
                                    tagNode: 'Аллергия на морковь',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        {
                                            tagNode: 'Говяжьи тефтели',
                                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/28.jpg'
                                        }
                                    ],
                                    negativeChildren: [
                                        {
                                            tagNode: 'Три блюда на пару по-Маньянски',
                                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/10.jpg'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagNode: 'Вареное',
                            children: [
                                {
                                    tagNode: 'Пряное',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        {
                                            tagNode: 'Суп из ягненка с питой',
                                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/21.jpg'
                                        }
                                    ],
                                    negativeChildren: [
                                        defaultChoice
                                    ]
                                }
                            ]
                        },
                        {
                            tagNode: 'Тушеное',
                            children: [
                                {
                                    tagNode: 'Острое',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        {
                                            tagNode: 'Аллергия на сою',
                                            yesNoQuestion: true,
                                            positiveChildren: [
                                                defaultChoice
                                            ],
                                            negativeChildren: [
                                                {
                                                    tagNode: 'Аллергия на имбирь',
                                                    yesNoQuestion: true,
                                                    positiveChildren: [
                                                        defaultChoice
                                                    ],
                                                    negativeChildren: [
                                                        {
                                                            tagNode: 'Мапо тофу',
                                                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/17.jpg'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    negativeChildren: [
                                        defaultChoice
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tagNode: 'Ягненок',
                    childrenDesc: 'Выберите тип приготовления',
                    children: [
                        {
                            tagNode: 'Вареное',
                            yesNoQuestion: true,
                            positiveChildren: [
                                {
                                    tagNode: 'Отварное мясо по-Монгольски',
                                    src: 'http://prochinese.ru/wp-content/uploads/2018/06/3755.jpg'
                                }
                            ],
                            negativeChildren: [
                                defaultChoice
                            ]
                        },
                        {
                            tagNode: 'Тушеное',
                            yesNoQuestion: true,
                            positiveChildren: [
                                {
                                    tagNode: 'Аллергия на грибы',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        defaultChoice
                                    ],
                                    negativeChildren: [
                                        {
                                            tagNode: 'Аллергия на сладкий перец',
                                            yesNoQuestion: true,
                                            positiveChildren: [
                                                defaultChoice
                                            ],
                                            negativeChildren: [
                                                {
                                                    tagNode: 'Тушеная лапша',
                                                    src: 'http://prochinese.ru/wp-content/uploads/2018/06/9.jpg'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            negativeChildren: [
                                defaultChoice
                            ]
                        },
                        {
                            tagNode: 'На пару',
                            yesNoQuestion: true,
                            positiveChildren: [
                                {
                                    tagNode: 'Пряное',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        {
                                            tagNode: 'Мясо ягненка, приготовленное на пару',
                                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/27.jpg'
                                        }
                                    ],
                                    negativeChildren: [
                                        defaultChoice
                                    ]
                                }
                            ],
                            negativeChildren: [
                                defaultChoice
                            ]
                        }
                    ]
                },
                {
                    tagNode: 'Внутренности',
                    childrenDesc: 'Выберите тип приготовления',
                    children: [
                        {
                            tagNode: 'Жареное',
                            yesNoQuestion: true,
                            positiveChildren: [
                                {
                                    tagNode: 'Острое',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        {
                                            tagNode: 'Кишки под коричневым соусом',
                                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/8.jpg'
                                        }
                                    ],
                                    negativeChildren: [
                                        defaultChoice
                                    ]
                                }
                            ],
                            negativeChildren: [
                                defaultChoice
                            ]
                        }
                    ]
                },
                {
                    tagNode: 'Из крови',
                    children: [
                        {
                            tagNode: 'Кровяная колбаса по-Тибетски',
                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/23.jpg'
                        }
                    ]
                },
                {
                    tagNode: 'Ничего из вышеперечисленного',
                    children: [
                        {
                            tagNode: defaultChoice
                        }
                    ]
                }
            ]
        },
        {
            tagNode: 'Рыба',
            children: [
                {
                    tagNode: 'Жареное',
                    children: [
                        {
                            tagNode: 'Соленое',
                            yesNoQuestion: true,
                            positiveChildren: [
                                {
                                    tagNode: 'Бакальяу',
                                    src: 'http://prochinese.ru/wp-content/uploads/2018/06/30.jpg'
                                }
                            ],
                            negativeChildren: [
                                {
                                    tagNode: 'Кисло-сладкое',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        {
                                            tagNode: 'Аллергия на сою',
                                            yesNoQuestion: true,
                                            positiveChildren: [
                                                {
                                                    tagNode: defaultChoice
                                                }
                                            ],
                                            negativeChildren: [
                                                {
                                                    tagNode: 'Аллергия на имбирь',
                                                    yesNoQuestion: true,
                                                    positiveChildren: [
                                                        {
                                                            tagNode: defaultChoice
                                                        }
                                                    ],
                                                    negativeChildren: [
                                                        {
                                                            tagNode: 'Карп в маринаде',
                                                            src: 'https://i1.wp.com/s2.travelask.ru/system/images/files/000/084/291/wysiwyg/4ce173fc05f961be2a85ced2114e9648.jpg'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    negativeChildren: [
                                        defaultChoice
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tagNode: 'Вареное',
                    children: [
                        {
                            tagNode: 'Острое',
                            yesNoQuestion: true,
                            positiveChildren: [
                                {
                                    tagNode: 'Рыба в кислом супе',
                                    src: 'http://prochinese.ru/wp-content/uploads/2018/06/19.jpg'
                                }
                            ],
                            negativeChildren: [
                                {
                                    tagNode: 'Соленое',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        {
                                            tagNode: 'Бакальяу',
                                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/30.jpg'
                                        }
                                    ],
                                    negativeChildren: [
                                        {
                                            tagNode: 'Кисло-сладкое',
                                            yesNoQuestion: true,
                                            positiveChildren: [
                                                {
                                                    tagNode: 'Аллергия на сою',
                                                    yesNoQuestion: true,
                                                    positiveChildren: [
                                                        {
                                                            tagNode: defaultChoice
                                                        }
                                                    ],
                                                    negativeChildren: [
                                                        {
                                                            tagNode: 'Аллергия на имбирь',
                                                            yesNoQuestion: true,
                                                            positiveChildren: [
                                                                {
                                                                    tagNode: defaultChoice
                                                                }
                                                            ],
                                                            negativeChildren: [
                                                                {
                                                                    tagNode: 'Рыба из озера Сиху в уксусе',
                                                                    src: 'http://prochinese.ru/wp-content/uploads/2018/06/5.jpg'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            negativeChildren: [
                                                {
                                                    tagNode: defaultChoice
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tagNode: 'На пару',
                    children: [
                        {
                            tagNode: 'Острое',
                            yesNoQuestion: true,
                            positiveChildren: [
                                {
                                    tagNode: 'Аллергия на имбирь',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        defaultChoice
                                    ],
                                    negativeChildren: [
                                        {
                                            tagNode: 'Рыбьи головы с острым перцем, приготовленные на пару',
                                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/11.jpg'
                                        }
                                    ]
                                }
                            ],
                            negativeChildren: [
                                {
                                    tagNode: 'Аллергия на имбирь',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        {
                                            tagNode: 'Белая рыба, приготовленная на пару',
                                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/Steamed-Whitefish.jpg'
                                        }
                                    ],
                                    negativeChildren: [
                                        {
                                            tagNode: 'Аллергия на сою',
                                            yesNoQuestion: true,
                                            positiveChildren: [
                                                {
                                                    tagNode: 'Белая рыба приготовленная на пару',
                                                    src: 'http://prochinese.ru/wp-content/uploads/2018/06/Steamed-Whitefish.jpg'
                                                }
                                            ],
                                            negativeChildren: [
                                                {
                                                    tagNode: 'Вонючий китайский окунь по-Хуаншаньски',
                                                    src: 'http://prochinese.ru/wp-content/uploads/2018/06/6.jpg'
                                                },
                                                {
                                                    tagNode: 'Белая рыба, приготовленная на пару',
                                                    src: 'http://prochinese.ru/wp-content/uploads/2018/06/Steamed-Whitefish.jpg'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            tagNode: 'Морепродукты',
            childrenDesc: 'Выберите тип приготовления',
            children: [
                {
                    tagNode: 'Жареное',
                    children: [
                        {
                            tagNode: 'Жирное',
                            yesNoQuestion: true,
                            positiveChildren: [
                                {
                                    tagNode: 'Кисло-сладкое',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        {
                                            tagNode: 'Аллергия на сою',
                                            yesNoQuestion: true,
                                            positiveChildren: [
                                                defaultChoice
                                            ],
                                            negativeChildren: [
                                                {
                                                    tagNode: 'Жареная лапша',
                                                    src: 'https://i0.wp.com/s1.travelask.ru/system/images/files/000/083/428/wysiwyg/42d71ca1b4cf8a50b589334dd8a97222.jpg'
                                                }
                                            ]
                                        }
                                    ],
                                    negativeChildren: [
                                        defaultChoice
                                    ]
                                }
                            ],
                            negativeChildren: [
                                {
                                    tagNode: defaultChoice
                                }
                            ]
                        }
                    ]
                },
                {
                    tagNode: 'Вареное',
                    children: [
                        {
                            tagNode: 'Острое',
                            yesNoQuestion: true,
                            positiveChildren: [
                                {
                                    tagNode: 'Аллергия на орехи',
                                    yesNoQuestion: true,
                                    positiveChildren: [
                                        defaultChoice
                                    ],
                                    negativeChildren: [
                                        {
                                            tagNode: 'Рисовая лапша с улитками',
                                            src: 'http://prochinese.ru/wp-content/uploads/2018/06/15.jpg'
                                        }
                                    ]
                                }
                            ],
                            negativeChildren: [

                            ]
                        }
                    ]
                },
            ]
        },
        {
            tagNode: 'Ничего из вышеперечисленного',
            children: [
                {
                    tagNode: defaultChoice
                }
            ]
        }
    ],
    negativeChildren: [
        {
            tagNode: defaultChoice
        }
    ]
}