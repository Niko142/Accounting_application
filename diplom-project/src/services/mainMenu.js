import Axios from 'axios';

export async function FetchVentilation(abortController, setState) {
  try {
    const res = await Axios.get('http://localhost:3001/main_ventilation', {
      signal: abortController.signal,
    });
    setState(res.data);
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных:', err);
    }
  }
}

export async function FetchFurniture(abortController, setState) {
  try {
    const res = await Axios.get('http://localhost:3001/main_furniture', {
      signal: abortController.signal,
    });
    setState(res.data);
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных:', err);
    }
  }
}

export async function FetchComputer(abortController, setState) {
  try {
    const res = await Axios.get('http://localhost:3001/main_computer', {
      signal: abortController.signal,
    });
    setState(res.data);
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных:', err);
    }
  }
}

export async function FetchLaptop(abortController, setState) {
  try {
    const res = await Axios.get('http://localhost:3001/main_laptop', {
      signal: abortController.signal,
    });
    setState(res.data);
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных:', err);
    }
  }
}

export async function FetchScreen(abortController, setState) {
  try {
    const res = await Axios.get('http://localhost:3001/main_screen', {
      signal: abortController.signal,
    });
    setState(res.data);
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных:', err);
    }
  }
}

export async function FetchScanner(abortController, setState) {
  try {
    const res = await Axios.get('http://localhost:3001/main_scanner', {
      signal: abortController.signal,
    });
    setState(res.data);
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных:', err);
    }
  }
}

export async function FetchCamera(abortController, setState) {
  try {
    const res = await Axios.get('http://localhost:3001/main_camera', {
      signal: abortController.signal,
    });
    setState(res.data);
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных:', err);
    }
  }
}
