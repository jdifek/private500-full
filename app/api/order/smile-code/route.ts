import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";

export async function POST(req: Request) {
  try {
    console.log("=== Начало обработки заказа ===");
    const requestBody = await req.json();
    console.log("Получены данные заказа:", JSON.stringify(requestBody, null, 2));

    const { crystals, totalCost: inputTotalCost, userId, serverId } = requestBody;

    if (!crystals || !inputTotalCost || !userId) {
      console.error("Отсутствуют обязательные поля:", { crystals, inputTotalCost, userId });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Получен userId:", userId);
    if (serverId) console.log("Получен serverId:", serverId);

    let totalCost = inputTotalCost;

    const publicIp = await axios.get("https://api.ipify.org?format=json");
    console.log("Реальный IP сервера:", publicIp.data.ip);

    // Тестовая платёжка — всегда успех
    console.log("Имитация платежа...");
    const paymentResult = { success: true, message: "Test payment successful" };
    console.log("Результат платежа:", paymentResult);

    if (!paymentResult.success) {
      console.error("Ошибка платежа:", paymentResult.message);
      return NextResponse.json({ error: paymentResult.message }, { status: 400 });
    }

    // Подготовка данных для SmileCode API
    const apiKey = "SmileCode-6c10-9950-ec0e1b582741";
    const secretKey = "SmileCode-3de083156b1c4e14-a77e44f1937c66b5";
    const baseUrl = "https://www.smile.one/smilecode/api/";
    const requestId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    const iat = Math.floor(Date.now() / 1000);
    const header = {
      alg: "HS256",
      typ: "JWT",
      "sc-api-key": apiKey,
      "sc-api-version": "2.0"
    };

    // Вызов productList для получения apiGame и subType
    console.log("Получение списка продуктов...");
    const productListPayload = {
      jsonrpc: "2.0",
      id: `${requestId}-product`,
      method: "productList",
      params: { iat }
    };
    const productListToken = jwt.sign(productListPayload, secretKey, { header });
    console.log("Токен productList:", jwt.decode(productListToken, { complete: true }));
    let apiGame;
    let subType;
    try {
      const productListResponse = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Sc-Api-Key": apiKey,
          "Sc-Api-Version": "2.0",
          Authorization: `Bearer ${productListToken}`
        },
        body: JSON.stringify(productListPayload)
      });
      console.log("HTTP статус productList:", productListResponse.status);
      const productListData = await productListResponse.json();
      console.log("Ответ productList:", JSON.stringify(productListData, null, 2));
      if (productListData.error) {
        console.error("Ошибка productList:", productListData.error);
        return NextResponse.json(
          { error: "Failed to fetch product list", details: productListData.error },
          { status: 400 }
        );
      }
      if (productListData.result?.productList?.length) {
        const topupProduct = productListData.result.productList.find(
          (item: any) => item.type === "topup" && item.apiGame === "mobilelegendsru"
        );
        if (!topupProduct) {
          console.error("Не найден topup продукт для mobilelegendsru в productList");
          return NextResponse.json(
            { error: "No topup product found for mobilelegendsru in productList" },
            { status: 400 }
          );
        }
        apiGame = topupProduct.apiGame;
        subType = topupProduct.subType;
        console.log("Выбран apiGame:", apiGame, "subType:", subType);
      } else {
        console.error("Пустой список продуктов в productList");
        return NextResponse.json(
          { error: "Empty product list from productList" },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Ошибка productList:", error);
      return NextResponse.json(
        { error: "Failed to connect to productList" },
        { status: 500 }
      );
    }

    // Вызов skuList
    console.log("Получение списка SKU...");
    const skuListPayload = {
      jsonrpc: "2.0",
      id: `${requestId}-sku`,
      method: "skuList",
      params: {
        apiGame,
        iat
      }
    };
    const skuListToken = jwt.sign(skuListPayload, secretKey, { header });
    console.log("Токен skuList:", jwt.decode(skuListToken, { complete: true }));
    let skuListResponse;
    try {
      const skuResponse = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Sc-Api-Key": apiKey,
          "Sc-Api-Version": "2.0",
          Authorization: `Bearer ${skuListToken}`
        },
        body: JSON.stringify(skuListPayload)
      });
      console.log("HTTP статус skuList:", skuResponse.status);
      skuListResponse = await skuResponse.json();
      console.log("Ответ skuList:", JSON.stringify(skuListResponse, null, 2));
      if (skuListResponse.error) {
        console.error("Ошибка skuList:", skuListResponse.error);
        return NextResponse.json(
          { error: "Failed to fetch SKU list", details: skuListResponse.error },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Ошибка skuList:", error);
      return NextResponse.json(
        { error: "Failed to connect to skuList" },
        { status: 500 }
      );
    }

    // Выбор SKU
    let skuItem;
    if (skuListResponse.result?.skuList) {
      console.log("Анализ SKU:", JSON.stringify(skuListResponse.result.skuList, null, 2));
      skuItem = skuListResponse.result.skuList.find(
        (item: any) => {
          const code = item.code && typeof item.code === "string" ? item.code.toLowerCase() : "";
          // Ищем по количеству алмазов в code, например, "diamond_88"
          const diamondMatch = code.match(/diamond_(\d+)/);
          return diamondMatch && parseInt(diamondMatch[1]) === crystals;
        }
      );
      if (skuItem) {
        console.log(`Найден SKU для ${crystals} алмазов:`, skuItem.sku);
        // Всегда используем цену из skuList
        totalCost = skuItem.price;
        console.log(`Используем цену из skuList: ${totalCost} RUB`);
      } else {
        console.error(`SKU для ${crystals} алмазов не найден в skuList`);
        return NextResponse.json(
          { error: `No SKU found for ${crystals} diamonds` },
          { status: 400 }
        );
      }
    } else {
      console.error("Пустой skuList для mobilelegendsru");
      return NextResponse.json(
        { error: "Empty SKU list for mobilelegendsru" },
        { status: 400 }
      );
    }

    // Проверка serverList
    let finalServerId = serverId || "6031";
    if (skuListResponse.result?.serverList?.length) {
      console.log("Доступные серверы:", skuListResponse.result.serverList);
      if (!finalServerId) {
        console.warn("serverId не предоставлен, но serverList не пустой");
      }
    } else {
      console.log("Список серверов пуст, server_id не требуется");
    }

    // Проверка user_id
    const normalizedUserId = userId.toString(); // Убедимся, что userId — строка
    console.log("Нормализованный userId:", normalizedUserId);

    // Формирование sendOrder
    const payload = {
      jsonrpc: "2.0",
      id: requestId,
      method: "sendOrder",
      params: {
        apiGame,
        items: [
          {
            sku: skuItem.sku,
            qty: 1,
            pid: skuItem.pid || "",
            price: totalCost,
            description: skuItem.code || `Mobile Legends ${crystals} Diamonds`,
            currency: skuItem.currency || "RUB"
          }
        ],
        userAccount: {
          user_id: normalizedUserId,
          server_id: finalServerId
        },
        iat
      }
    };
    const token = jwt.sign(payload, secretKey, { header });
    console.log("Токен sendOrder:", jwt.decode(token, { complete: true }));

    const headers = {
      "Content-Type": "application/json",
      "Sc-Api-Key": apiKey,
      "Sc-Api-Version": "2.0",
      Authorization: `Bearer ${token}`
    };
    const body = {
      jsonrpc: "2.0",
      id: requestId,
      method: "sendOrder",
      params: {
        apiGame,
        items: [
          {
            sku: skuItem.sku,
            qty: 1,
            pid: skuItem.pid || "",
            price: totalCost,
            description: skuItem.code || `Mobile Legends ${crystals} Diamonds`,
            currency: skuItem.currency || "RUB"
          }
        ],
        userAccount: {
          user_id: normalizedUserId,
          server_id: finalServerId
        }
      }
    };

    console.log("Отправка sendOrder...");
    console.log("URL:", baseUrl);
    console.log("Headers:", headers);
    console.log("Body:", JSON.stringify(body, null, 2));

    let smileCodeResponse;
    try {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
      });
      console.log("HTTP статус sendOrder:", res.status);
      smileCodeResponse = await res.json();
      console.log("Ответ sendOrder:", JSON.stringify(smileCodeResponse, null, 2));
    } catch (error) {
      console.error("Ошибка sendOrder:", error);
      return NextResponse.json(
        { error: "Failed to connect to sendOrder" },
        { status: 500 }
      );
    }

    const hasError = smileCodeResponse.error;
    const status = hasError
      ? "failed"
      : smileCodeResponse.result?.message === "Success"
      ? "completed"
      : "failed";
    const smileCodeMessage = hasError
      ? smileCodeResponse.error.message
      : smileCodeResponse.result?.message || "Unknown response";

    console.log("Финальный статус:", status);
    console.log("Сообщение SmileCode:", smileCodeMessage);
    console.log("=== Завершение обработки ===");

    return NextResponse.json(
      {
        status,
        message: `Request sent to SmileCode: ${smileCodeMessage}`,
        paymentMessage: paymentResult.message,
        data: body.params,
        userId: normalizedUserId,
        smileCodeResponse
      },
      { status: hasError ? 400 : 200 }
    );
  } catch (error) {
    console.error("Критическая ошибка:", error);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}