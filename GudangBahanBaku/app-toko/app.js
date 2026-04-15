// 1. Buat fungsi Async (Karena mengambil data butuh waktu menunggu)
async function ambilDataBarang() {
    const tabel = document.getElementById('tabel-barang');

    // 🔴 Loading dulu (biar tidak kosong)
    tabel.innerHTML = `
        <tr class="state-row animate-pulse">
            <td colspan="3">
                <span class="state-text">Memuat koleksi barang...</span>
            </td>
        </tr>
    `;

    try {
        // 2. Panggil Pelayan (Fetch) menuju URL API
        const response = await fetch('http://localhost/GudangBahanBaku/api-toko/get-barang.php');
        
        // 3. Bongkar paket (Ubah string JSON jadi Object JS)
        const hasil = await response.json();
        
        if (hasil.status === 'success') {
            let barisHTML = '';
            
            // 4. Looping data barang
            hasil.data.forEach((barang, index) => {
                barisHTML += `
                    <tr>
                        <td class="td-no">
                            ${String(index + 1).padStart(2, '0')}
                        </td>
                        <td class="td-nama">
                            ${barang.nama_barang}
                        </td>
                        <td>
                            <div class="price-tag">
                                <span class="price-currency">Rp</span>
                                <span class="price-amount">${barang.harga}</span>
                            </div>
                        </td>
                    </tr>
                `;
            });
            
            // 5. Tampilkan ke tabel
            tabel.innerHTML = barisHTML;

        } else {
            tabel.innerHTML = `
                <tr class="state-row">
                    <td colspan="3">
                        <span class="state-text">Data tidak tersedia</span>
                    </td>
                </tr>
            `;
        }

    } catch (error) {
        console.error('Gagal mengambil data:', error);

        tabel.innerHTML = `
            <tr class="state-row">
                <td colspan="3">
                    <span class="state-text">Gagal memuat data</span>
                </td>
            </tr>
        `;
    }
}

// 6. Jalankan fungsi saat file JS ini di-load
ambilDataBarang();